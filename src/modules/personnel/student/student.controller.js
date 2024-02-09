const autoBind = require("auto-bind");
const { matchedData, body } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const studentService = require("./student.service");
const { StudentMessage } = require("./student.message");
const { validate } = require("../../../common/middlewares/validateExpressValidator");
const { deleteFileInPublic } = require("../../../common/utils/function");

class StudentController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = studentService;
  }
  async register(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.register(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: StudentMessage.Register,
      });
    } catch (error) {
      req.body.imageUrl && deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const paramData = matchedData(req, { locations: ["params"] });

      await this.#service.updateProfile(bodyData, paramData);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: StudentMessage.Update,
      });
    } catch (error) {
      req.body.imageUrl && deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }

  // async updateStudent(req, res, next) {
  //   try {
  //     try {
  //       const studentFound = await this.checkExistStudent(req.params.id);

  //       const data = copyObject(req.body);

  //       // normalize Data
  //       let { birthDayIR, registerDateIR, sportsInsuranceIR, mobile } = data;
  //       normalizeDataDates(data, birthDayIR, registerDateIR, sportsInsuranceIR);
  //       mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

  //       const blackListFields = [
  //         "beltID",
  //         "ageGroupID",
  //         "createdBy",
  //         "fileUploadPath",
  //         "filename",
  //         // "beltDateIR",
  //         "birthDayEN",
  //         "registerDateEN",
  //         "sportsInsuranceEN",
  //         "beltDateEN",
  //         "coachID",
  //       ];

  //       deleteInvalidPropertyInObject(data, blackListFields);

  //       // validate
  //       await studentAndCoachSchema.validateAsync(data);

  //       //validate clubID , coachID and nationalID
  //       const { nationalID, clubID, coachID } = data;
  //       await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, coachID, "");

  //       // update
  //       const studentCreated = await StudentModel.updateOne({ _id: req.params.id }, data, {
  //         new: true,
  //       });
  //       if (!studentCreated.modifiedCount) throw createHttpError.InternalServerError("بروزرسانی اطلاعات با خطا مواجه شد");

  //       if (data.imageUrl) deleteFileInPublic(studentFound.imageUrl);

  //       res.status(StatusCodes.OK).json({
  //         status: "success",
  //         message: "بروزرسانی اطلاعات با موفقیت انجام شد",
  //       });
  //     } catch (error) {
  //       deleteFileInPublic(req.body.imageUrl);
  //       next(error);
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async loginStudent(req, res, next) {
  //   try {
  //     try {
  //       const data = copyObject(req.body);

  //       const { username, password } = data;

  //       // check student found
  //       if (!username) throw createHttpError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

  //       const studentFound = await StudentModel.findOne({ nationalID: username });
  //       if (!studentFound) throw createHttpError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

  //       // check valid password
  //       const isValidPassword = password === "123456";
  //       if (!isValidPassword) throw createHttpError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

  //       const token = generateToken({ id: studentFound._id });

  //       res.cookie("access_token", token, {
  //         httpOnly: true,
  //         secure: true, // production => true
  //       });
  //       res.redirect("/dashboard");
  //     } catch (error) {
  //       res.redirect("/login");
  //     }
  //   } catch (error) {
  //     next(error);
  //   }
  // }

  // async getStudents(req, res, next) {
  //   try {
  //     // res.status(200).json(res.result);
  //     const students = await StudentModel.find({})
  //       .populate("clubID", "name")
  //       .populate("beltID", "name")
  //       .populate("ageGroupID", "name description")
  //       .populate("coachID", "firstName lastName");
  //     if (!students) throw createHttpError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");

  //     res.status(StatusCodes.OK).json({
  //       status: "success",
  //       message: "دریافت اطلاعات با موفقیت انجام شد",
  //       data: students,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async getStudent(req, res, next) {
  //   try {
  //     const students = await this.checkExistStudent(req.params.id);

  //     if (!students) throw createHttpError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
  //     res.status(StatusCodes.OK).json({
  //       status: "success",
  //       message: "دریافت اطلاعات با موفقیت انجام شد",
  //       data: students,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async profileStudent(req, res, next) {
  //   try {
  //     const studentID = req.userAuth._id;

  //     const profileStudent = await this.checkExistStudent(studentID);

  //     const dateNextBelt = nextBeltDate(profileStudent.beltDateIR, profileStudent.belt.duration);
  //     const nextBeltDateIR = {
  //       dateNextBelt: dateNextBelt,
  //       dayNextBelt: dateDiffDayNowShamsi(dateNextBelt),
  //       dateBeltExamNext: await dateBeltExamNext(profileStudent.belt, dateNextBelt),
  //     };
  //     profileStudent.nextBeltDate = nextBeltDateIR;

  //     if (!profileStudent) throw createHttpError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");

  //     res.status(StatusCodes.OK).json({
  //       status: "success",
  //       message: "دریافت اطلاعات با موفقیت انجام شد",
  //       data: profileStudent ? profileStudent : {},
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async upgradeStudentBelt(req, res, next) {
  //   try {
  //     const studentFound = await this.checkExistStudent(req.params.id);

  //     const [getYear] = toEnglish(new Date().toLocaleDateString("fa-IR")).split("/");
  //     const { memberShipValidity, beltID: belt, beltDateEN, beltDateIR } = studentFound;

  //     // if (memberShipValidity < +getYear) {
  //     //   const yearValidity = +getYear - memberShipValidity + 1;
  //     //   throw createHttpError.BadRequest(`برای ثبت ارتفاء کمربند هنرجو باید ${yearValidity} سال شارژ شود`);
  //     // }

  //     if (["سفید", "زرد", "سبز"].includes(belt.name)) {
  //       let [year, month, day] = beltDateIR.split("/");
  //       for (let i = 1; i <= belt.duration; i++) {
  //         if (month >= 12) {
  //           year++;
  //           month = 1;
  //         } else {
  //           month++;
  //         }
  //       }

  //       console.log(year, month, +day);
  //       // const dateNextBelt = beltDateEN.getTime() + belt.duration;
  //       // console.log(new Date(dateNextBelt).toLocaleDateString("fa-IR"));
  //     }
  //     res.status(StatusCodes.OK).json({
  //       status: "success",
  //       message: "دریافت اطلاعات با موفقیت انجام شد",
  //       // data: profileStudent ? profileStudent : {},
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async deleteStudent(req, res, next) {
  //   try {
  //     if (!isValidObjectId(req.params.id)) throw createHttpError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  //     const deletedStudent = await StudentModel.deleteOne({ _id: req.params.id });
  //     if (!deletedStudent.deletedCount) throw createHttpError.InternalServerError("حذف هنرجو با خطا مواجه شد");

  //     res.status(StatusCodes.OK).json({
  //       status: "success",
  //       message: "حذف هنرجو با موفقیت انجام شد",
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async checkExistStudent(id) {
  //   if (!isValidObjectId(id)) throw createHttpError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  //   // find student
  //   const studentFound = await StudentModel.aggregate([
  //     { $match: { _id: new mongoose.Types.ObjectId(id) } },
  //     {
  //       $lookup: {
  //         from: "clubs",
  //         localField: "clubID",
  //         foreignField: "_id",
  //         as: "club",
  //       },
  //     },
  //     { $unwind: "$club" },
  //     {
  //       $lookup: {
  //         from: "agegroups",
  //         localField: "ageGroupID",
  //         foreignField: "_id",
  //         as: "ageGroup",
  //       },
  //     },
  //     {
  //       $lookup: {
  //         from: "belts",
  //         localField: "beltID",
  //         foreignField: "_id",
  //         as: "belt",
  //       },
  //     },
  //     { $unwind: "$belt" },
  //     {
  //       $project: {
  //         clubID: 0,
  //         beltID: 0,
  //         ageGroupID: 0,
  //         createdAt: 0,
  //         updatedAt: 0,
  //         beltDateEN: 0,
  //         birthDayEN: 0,
  //         "ageGroup.fromDateEN": 0,
  //         "ageGroup.toDateEN": 0,
  //       },
  //     },
  //   ]).then((items) => items[0]);

  //   if (!studentFound) throw createHttpError.NotFound("دریافت اطلاعات با خطا مواجه شد");

  //   const [getYear] = toEnglish(new Date().toLocaleDateString("fa-IR")).split("/");
  //   if (studentFound.memberShipValidity < +getYear) {
  //     studentFound.memberShipValidity = {
  //       validity: studentFound.memberShipValidity,
  //       yearValidaty: +getYear - studentFound.memberShipValidity + 1,
  //     };
  //   }

  //   const dateNextBelt = nextBeltDate(studentFound.beltDateIR, studentFound.belt.duration);
  //   const nextBeltDateIR = {
  //     dateNextBelt: dateNextBelt,
  //     dayNextBelt: dateDiffDayNowShamsi(dateNextBelt),
  //     dateBeltExamNext: await dateBeltExamNext(studentFound.belt, dateNextBelt),
  //   };

  //   studentFound.nextBeltDate = nextBeltDateIR;

  //   return studentFound;
  // }
  // async checkExistStudentByNationalId(nationalID) {
  //   const studentFound = await StudentModel.findOne({ nationalID });
  //   if (studentFound) throw createHttpError.Conflict("کد ملی وارد شده تکراری است");
  // }
}

module.exports = new StudentController();
