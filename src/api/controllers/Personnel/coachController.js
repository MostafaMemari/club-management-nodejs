const createError = require("http-errors");
const path = require("path");
const { isValidObjectId } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

const { copyObject, deleteInvalidPropertyInObject, deleteFileInPublic } = require("../../helpers/function");
const { studentAndCoachSchema } = require("../../validations/authSchema");
const { coachModel } = require("../../models/Personnel/coachModel");
const { validate_nationalId_clubId_coachId_beltId } = require("../../helpers/validateFoundDB");
const { normalizeDataDates, normalizePhoneNumber } = require("../../helpers/normalizeData");
const { generateToken } = require("../../services/tokenServices");
const { isPassMatched } = require("../../services/passwordServices");

class CoachController {
  constructor() {
    autoBind(this);
  }
  async registerCoach(req, res, next) {
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
      let { birthDayIR, registerDateIR, mobile } = data;
      normalizeDataDates(data, birthDayIR, registerDateIR);
      mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

      const blackListFields = ["phone", "ageGroupID", "coachID", "birthDayEN", "registerDateEN", "createdBy"];
      deleteInvalidPropertyInObject(data, blackListFields);

      // validate firstName And lastName
      const { firstName, lastName, nationalID, clubID, beltID } = data;

      if (!firstName) throw createError.BadRequest("نام وارد شده معتبر نمی باشد");
      if (!lastName) throw createError.BadRequest("نام خانوادگی وارد شده معتبر نمی باشد");
      if (!nationalID) throw createError.BadRequest("کد ملی وارد شده معتبر نمی باشد");

      // validate
      await studentAndCoachSchema.validateAsync(data);

      await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, "", beltID);
      //create
      const coachCreated = await coachModel.create(data);
      if (!coachCreated) throw createError.InternalServerError("ثبت نام مربی با خطا مواجه شد");

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "ثبت مربی با موفقیت انجام شد ",
        data: coachCreated,
      });
    } catch (error) {
      deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }
  async loginCoach(req, res, next) {
    try {
      const data = copyObject(req.body);

      const { username, password } = data;

      // check coach found
      if (!username) throw createError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

      const coachFound = await coachModel.findOne({ nationalID: username });
      if (!coachFound) throw createError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

      // check valid password
      const isValidPassword = password === "123456";
      if (!isValidPassword) throw createError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

      const token = generateToken({ id: coachFound._id });

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "با موفقیت وارد سیستم شدید",
        data: {
          token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async profileCoach(req, res, next) {
    try {
      const coachID = req.userAuth._id;

      const profileCoach = await coachModel.findById(coachID).populate("clubID", "name").populate("beltID", "name");

      if (!profileCoach) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: profileCoach ? profileCoach : {},
      });
    } catch (error) {
      next(error);
    }
  }
  async updateCoach(req, res, next) {
    try {
      const coachFound = await checkExistCoach(req.params.id);

      const { fileUploadPath, filename } = req.body;
      if (fileUploadPath && filename) {
        const urlPath = path.join(fileUploadPath, filename);
        req.body.imageUrl = urlPath.replace(/\\/g, "/");

        delete req.body["fileUploadPath"];
        delete req.body["filename"];
      }

      const data = copyObject(req.body);

      // normalize Data
      let { birthDayIR, registerDateIR, mobile } = data;
      normalizeDataDates(data, birthDayIR, registerDateIR);
      mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

      const blackListFields = ["phone", "ageGroupID", "coachID", "birthDayEN", "registerDateEN", "createdBy"];
      deleteInvalidPropertyInObject(data, blackListFields);

      // validate firstName And lastName
      const { nationalID, clubID, beltID } = data;
      await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, "", beltID);

      // validate
      await studentAndCoachSchema.validateAsync(data);

      // updated
      const coachUpdated = await coachModel.updateOne({ _id: req.params.id }, data);
      if (!coachUpdated.modifiedCount) throw createError.InternalServerError("بروزرسانی اطلاعات با خطا مواجه شد");

      if (data.imageUrl) deleteFileInPublic(coachFound.imageUrl);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "بروزرسانی اطلاعات با موفقیت انجام شد",
      });
    } catch (error) {
      deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }
  async getCoach(req, res, next) {
    try {
      const coach = await checkExistCoach(req.params.id);

      if (!coach) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: coach,
      });
    } catch (error) {
      next(error);
    }
  }
  async getCoachs(req, res, next) {
    try {
      const coachs = await coachModel
        .find({})
        .lean()
        .populate({
          path: "clubID",
          populate: {
            path: "sportID",
          },
        })
        .populate("beltID")
        .select("-createdAt -updatedAt -registerDateEN -birthDayEN");

      if (!coachs) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: coachs,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteCoach(req, res, next) {
    try {
      if (!isValidObjectId(req.params.id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

      const deletedCoach = await coachModel.deleteOne({ _id: req.params.id });
      if (!deletedCoach.deletedCount) throw createError.InternalServerError("حذف مربی با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "حذف مربی با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistCoach(id) {
    if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

    // find Coachs
    const coachFound = await coachModel
      .findById(id)
      .lean()
      .populate({
        path: "clubID",
        populate: {
          path: "sportID",
        },
      })
      .populate("beltID")
      .select("-createdAt -updatedAt -registerDateEN -birthDayEN");
    if (!coachFound) throw createError.NotFound("مربی مورد نظر یافت نشد");
    return coachFound;
  }
}

module.exports = new CoachController();
