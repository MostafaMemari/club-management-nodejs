const autoBind = require("auto-bind");
const { validationResult, matchedData } = require("express-validator");
const { normalizeDataDates, normalizePhoneNumber } = require("../../../common/utils/normalizeData");
const { validate_nationalId_clubId_coachId_beltId } = require("../../../common/utils/validateFoundDB");

class Student {
  #service;
  constructor() {
    autoBind(this);
    // this.#service = studentService;
  }
  async register(bodyData) {
    try {
      try {
        // const { fileUploadPath, filename } = req.body;
        // if (fileUploadPath && filename) {
        //   const urlPath = path.join(fileUploadPath, filename);
        //   req.body.imageUrl = urlPath.replace(/\\/g, "/");
        //   delete req.body["fileUploadPath"];
        //   delete req.bconst autoBind = require("auto-bind");
        const createError = require("http-errors");
        const { StatusCodes } = require("http-status-codes");
        const { isValidObjectId } = require("mongoose");

        const { copyObject, deleteInvalidPropertyInObject } = require("../../../common/utils/function");
        const { permissionSchema } = require("../RBAC.Schema");
        const { permissionModel } = require("../../models/RBAC/permissionModel");
        const { roleModel } = require("../role/roleModel");

        class PermissionController {
          constructor() {
            autoBind(this);
          }
          async createPermission(req, res, next) {
            try {
              const data = copyObject(req.body);
              deleteInvalidPropertyInObject(data);

              // validate
              const { name } = await permissionSchema.validateAsync(data);
              if (!name) throw createError.BadRequest("عنوان نقش نمی تواند خالی باشد");

              await this.checkExistPermissionName(name);

              // create
              const permissionFound = new permissionModel(data);
              await permissionFound.save();
              if (!permissionFound) throw createError.InternalServerError("ثبت سطح دسترسی با خطا مواجه شد");

              res.status(StatusCodes.CREATED).json({
                status: "success",
                message: "ثبت سطح دسترسی با موفقیت انجام شد",
              });
            } catch (error) {
              next(error);
            }
          }
          async updatePermission(req, res, next) {
            try {
              await this.checkExistPermissionID(req.params.id);

              const data = copyObject(req.body);
              deleteInvalidPropertyInObject(data);

              // validate
              const { name } = await permissionSchema.validateAsync(data);

              // find Permission
              if (name) {
                const permissionFound = await permissionModel.findOne({ name });
                if (permissionFound) throw createError.Conflict("نقش وارد شده تکراری می باشد");
              }

              // update
              const permissionUpdated = await permissionModel.updateOne({ _id: req.params.id }, data);
              if (!permissionUpdated) throw createError.InternalServerError("بروزرسانی رشته ورزشی با خطا مواجه شد");

              res.status(StatusCodes.OK).json({
                status: "success",
                message: "بروزرسانی رشته ورزشی با موفقیت انجام شد",
              });
            } catch (error) {
              next(error);
            }
          }
          async removePermission(req, res, next) {
            try {
              await this.checkExistPermissionID(req.params.id);

              // Remove Permission By Role
              await roleModel.updateMany({ permissions: req.params.id }, { $pull: { permissions: req.params.id } });

              // update
              const permissionDeleted = await permissionModel.deleteOne({ _id: req.params.id });
              if (!permissionDeleted) throw createError.InternalServerError("حذف سطح دسترسی با خطا مواجه شد");

              res.status(StatusCodes.OK).json({
                status: "success",
                message: "حدف سطح دسترسی با موفقیت انجام شد",
              });
            } catch (error) {
              next(error);
            }
          }
          async getPermission(req, res, next) {
            try {
              const permissionFound = await this.checkExistPermissionID(req.params.id);

              res.status(StatusCodes.OK).json({
                status: "success",
                message: "دریافت اطلاعات با موفقیت انجام شد",
                data: permissionFound,
              });
            } catch (error) {
              next(error);
            }
          }
          async getPermissions(req, res, next) {
            try {
              const permissionFound = await permissionModel.find({}).lean();

              res.status(StatusCodes.OK).json({
                status: "success",
                message: "دریافت اطلاعات با موفقیت انجام شد",
                data: permissionFound,
              });
            } catch (error) {
              next(error);
            }
          }
          async checkExistPermissionName(name) {
            const permissionFound = await permissionModel.findOne({ name });
            if (permissionFound) throw createError.BadRequest("سطح دسترسی وارد شده تکراری می باشد");
            return permissionFound;
          }
          async checkExistPermissionID(id) {
            if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

            const permissionFound = await permissionModel.findById(id);
            if (!permissionFound) throw createError.BadRequest("سطح دسترسی مورد نظر یافت نشد");
            return permissionFound;
          }
        }

        module.exports = new PermissionController();
        ody["filename"];
        // }

        //find belt
        if (beltID) {
          const beltFound = await BeltModel.findById(beltID);
          if (!beltFound) throw createHttpError.NotFound("کمربند مورد نظر یافت نشد");
          if (beltFound.name !== "سفید") {
            delete data.beltID;
            delete data.beltDateIR;
          } else {
            data.beltDateIR = toEnglish(normalizeCalendar(new Date().toLocaleDateString("fa-IR")));
          }
        }
        // create
        const studentCreated = await StudentModel.create({
          ...data,
          createdBy: req.userAuth._id,
          modelCreatedBy: req.userAuth.role == "COACH" ? "coach" : "user",
        });
        if (!studentCreated) throw createHttpError.InternalServerError("ثبت نام با خطا مواجه شد");
      } catch (error) {
        deleteFileInPublic(req.body.imageUrl);
        next(error);
      }
    } catch (error) {
      next(error);
    }
  }

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

module.exports = new Student();