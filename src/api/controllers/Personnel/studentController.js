const autoBind = require("auto-bind");
const createError = require("http-errors");
const { isValidObjectId, default: mongoose } = require("mongoose");
const path = require("path");
const { StatusCodes } = require("http-status-codes");

const { studentAndCoachSchema } = require("../../validations/authSchema");
const {
  copyObject,
  deleteInvalidPropertyInObject,
  deleteFileInPublic,
  toEnglish,
  nextBeltDate,
  dateDiffDayNowShamsi,
  dateBeltExamNext,
} = require("../../helpers/function");
const { studentModel } = require("../../models/Personnel/studentModel");
const { normalizeDataDates, normalizePhoneNumber, normalizeCalendar } = require("../../helpers/normalizeData");
const { validate_nationalId_clubId_coachId_beltId } = require("../../helpers/validateFoundDB");
const { generateToken } = require("../../services/tokenServices");
const { beltModel } = require("../../models/BaseData/beltModel");

class StudentController {
  constructor() {
    autoBind(this);
  }
  async registerStudent(req, res, next) {
    try {
      try {
        const { fileUploadPath, filename } = req.body;
        if (fileUploadPath && filename) {
          const urlPath = path.join(fileUploadPath, filename);
          req.body.imageUrl = urlPath.replace(/\\/g, "/");

          delete req.body["fileUploadPath"];
          delete req.body["filename"];
        }

        const data = copyObject(req.body);

        // normalize Data
        let { birthDayIR, registerDateIR, sportsInsuranceIR, mobile } = data;
        normalizeDataDates(data, birthDayIR, registerDateIR, sportsInsuranceIR);
        mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

        const blackListFields = [
          "ageGroupID",
          "createdBy",
          "fileUploadPath",
          "filename",
          "beltDateIR",
          "birthDayEN",
          "registerDateEN",
          "sportsInsuranceEN",
          "beltDateEN",
          "coachID",
        ];
        deleteInvalidPropertyInObject(data, blackListFields);

        // validate
        await studentAndCoachSchema.validateAsync(data);

        //validate firstName And lastName
        const { firstName, lastName, nationalID, clubID, beltID, coachID } = data;

        if (!firstName) throw createError.BadRequest("نام وارد شده معتبر نمی باشد");
        if (!lastName) throw createError.BadRequest("نام خانوادگی وارد شده معتبر نمی باشد");

        //validate clubID , coachID and nationalID
        await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, coachID, "");

        //find belt
        if (beltID) {
          const beltFound = await beltModel.findById(beltID);
          if (!beltFound) throw createError.NotFound("کمربند مورد نظر یافت نشد");
          if (beltFound.name !== "سفید") {
            delete data.beltID;
            delete data.beltDateIR;
          } else {
            data.beltDateIR = toEnglish(normalizeCalendar(new Date().toLocaleDateString("fa-IR")));
          }
        }

        // create
        const studentCreated = await studentModel.create({
          ...data,
          createdBy: req.userAuth._id,
          modelCreatedBy: req.userAuth.role == "COACH" ? "coach" : "user",
        });
        if (!studentCreated) throw createError.InternalServerError("ثبت نام با خطا مواجه شد");

        res.status(StatusCodes.CREATED).json({
          status: "success",
          message: "ثبت نام هنرجو با موفقیت انجام شد",
          data,
          // data: studentCreated,
        });
      } catch (error) {
        deleteFileInPublic(req.body.imageUrl);
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
  async loginStudent(req, res, next) {
    try {
      try {
        const data = copyObject(req.body);

        const { username, password } = data;

        // check student found
        if (!username) throw createError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

        const studentFound = await studentModel.findOne({ nationalID: username });
        if (!studentFound) throw createError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

        // check valid password
        const isValidPassword = password === "123456";
        if (!isValidPassword) throw createError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

        const token = generateToken({ id: studentFound._id });

        res.cookie("access_token", token, {
          httpOnly: true,
          secure: true, // production => true
        });
        res.redirect("/dashboard");
      } catch (error) {
        res.redirect("/login");
      }
    } catch (error) {
      next(error);
    }
  }
  async updateStudent(req, res, next) {
    try {
      try {
        const studentFound = await this.checkExistStudent(req.params.id);

        const data = copyObject(req.body);

        // normalize Data
        let { birthDayIR, registerDateIR, sportsInsuranceIR, mobile } = data;
        normalizeDataDates(data, birthDayIR, registerDateIR, sportsInsuranceIR);
        mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

        const blackListFields = [
          "beltID",
          "ageGroupID",
          "createdBy",
          "fileUploadPath",
          "filename",
          // "beltDateIR",
          "birthDayEN",
          "registerDateEN",
          "sportsInsuranceEN",
          "beltDateEN",
          "coachID",
        ];

        deleteInvalidPropertyInObject(data, blackListFields);

        // validate
        await studentAndCoachSchema.validateAsync(data);

        //validate clubID , coachID and nationalID
        const { nationalID, clubID, coachID } = data;
        await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, coachID, "");

        // update
        const studentCreated = await studentModel.updateOne({ _id: req.params.id }, data, {
          new: true,
        });
        if (!studentCreated.modifiedCount) throw createError.InternalServerError("بروزرسانی اطلاعات با خطا مواجه شد");

        if (data.imageUrl) deleteFileInPublic(studentFound.imageUrl);

        res.status(StatusCodes.OK).json({
          status: "success",
          message: "بروزرسانی اطلاعات با موفقیت انجام شد",
        });
      } catch (error) {
        deleteFileInPublic(req.body.imageUrl);
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }
  async getStudents(req, res, next) {
    try {
      // res.status(200).json(res.result);
      const students = await studentModel
        .find({})
        .populate("clubID", "name")
        .populate("beltID", "name")
        .populate("ageGroupID", "name description")
        .populate("coachID", "firstName lastName");
      if (!students) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: students,
      });
    } catch (error) {
      next(error);
    }
  }
  async getStudent(req, res, next) {
    try {
      const students = await this.checkExistStudent(req.params.id);

      if (!students) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: students,
      });
    } catch (error) {
      next(error);
    }
  }
  async profileStudent(req, res, next) {
    try {
      const studentID = req.userAuth._id;

      const profileStudent = await this.checkExistStudent(studentID);

      const dateNextBelt = nextBeltDate(profileStudent.beltDateIR, profileStudent.belt.duration);
      const nextBeltDateIR = {
        dateNextBelt: dateNextBelt,
        dayNextBelt: dateDiffDayNowShamsi(dateNextBelt),
        dateBeltExamNext: await dateBeltExamNext(profileStudent.belt, dateNextBelt),
      };
      profileStudent.nextBeltDate = nextBeltDateIR;

      if (!profileStudent) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: profileStudent ? profileStudent : {},
      });
    } catch (error) {
      next(error);
    }
  }
  async upgradeStudentBelt(req, res, next) {
    try {
      const studentFound = await this.checkExistStudent(req.params.id);

      const [getYear] = toEnglish(new Date().toLocaleDateString("fa-IR")).split("/");
      const { memberShipValidity, beltID: belt, beltDateEN, beltDateIR } = studentFound;

      // if (memberShipValidity < +getYear) {
      //   const yearValidity = +getYear - memberShipValidity + 1;
      //   throw createError.BadRequest(`برای ثبت ارتفاء کمربند هنرجو باید ${yearValidity} سال شارژ شود`);
      // }

      if (["سفید", "زرد", "سبز"].includes(belt.name)) {
        let [year, month, day] = beltDateIR.split("/");
        for (let i = 1; i <= belt.duration; i++) {
          if (month >= 12) {
            year++;
            month = 1;
          } else {
            month++;
          }
        }

        console.log(year, month, +day);
        // const dateNextBelt = beltDateEN.getTime() + belt.duration;
        // console.log(new Date(dateNextBelt).toLocaleDateString("fa-IR"));
      }
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        // data: profileStudent ? profileStudent : {},
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteStudent(req, res, next) {
    try {
      if (!isValidObjectId(req.params.id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

      const deletedStudent = await studentModel.deleteOne({ _id: req.params.id });
      if (!deletedStudent.deletedCount) throw createError.InternalServerError("حذف هنرجو با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "حذف هنرجو با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistStudent(id) {
    if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

    // find student
    const studentFound = await studentModel
      .aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(id) } },
        {
          $lookup: {
            from: "clubs",
            localField: "clubID",
            foreignField: "_id",
            as: "club",
          },
        },
        { $unwind: "$club" },
        {
          $lookup: {
            from: "agegroups",
            localField: "ageGroupID",
            foreignField: "_id",
            as: "ageGroup",
          },
        },
        {
          $lookup: {
            from: "belts",
            localField: "beltID",
            foreignField: "_id",
            as: "belt",
          },
        },
        { $unwind: "$belt" },
        {
          $project: {
            clubID: 0,
            beltID: 0,
            ageGroupID: 0,
            createdAt: 0,
            updatedAt: 0,
            beltDateEN: 0,
            birthDayEN: 0,
            "ageGroup.fromDateEN": 0,
            "ageGroup.toDateEN": 0,
          },
        },
      ])
      .then((items) => items[0]);

    if (!studentFound) throw createError.NotFound("دریافت اطلاعات با خطا مواجه شد");

    const [getYear] = toEnglish(new Date().toLocaleDateString("fa-IR")).split("/");
    if (studentFound.memberShipValidity < +getYear) {
      studentFound.memberShipValidity = {
        validity: studentFound.memberShipValidity,
        yearValidaty: +getYear - studentFound.memberShipValidity + 1,
      };
    }

    const dateNextBelt = nextBeltDate(studentFound.beltDateIR, studentFound.belt.duration);
    const nextBeltDateIR = {
      dateNextBelt: dateNextBelt,
      dayNextBelt: dateDiffDayNowShamsi(dateNextBelt),
      dateBeltExamNext: await dateBeltExamNext(studentFound.belt, dateNextBelt),
    };

    studentFound.nextBeltDate = nextBeltDateIR;

    return studentFound;
  }
  async checkExistStudentByNationalId(nationalID) {
    const studentFound = await studentModel.findOne({ nationalID });
    if (studentFound) throw createError.Conflict("کد ملی وارد شده تکراری است");
  }
}

module.exports = new StudentController();
