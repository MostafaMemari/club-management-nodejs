const autoBind = require("auto-bind");
const { isValidObjectId } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");

const { sportSchema, sportSchemaUpdate } = require("../../validations/clubSchema");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { sportModel } = require("../../models/BaseData/sportModel");
const { clubModel } = require("../../models/Management/clubModel");

class SportController {
  constructor() {
    autoBind(this);
  }
  async createSport(req, res, next) {
    try {
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data);

      // validate
      await sportSchema.validateAsync(data);

      const { name } = data;

      // find sport
      const sportFound = await sportModel.findOne({ name });
      if (sportFound) throw createError.Conflict("رشته ورزشی تکراری می باشد");

      // create
      const sportCreated = new sportModel(data);
      await sportCreated.save();
      if (!sportCreated) throw createError.InternalServerError("ثبت رشته ورزشی با خطا مواجه شد");

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "رشته ورزشی مورد نظر با موفقیت ثبت شد",
        sportCreated,
      });
    } catch (error) {
      next(error);
    }
  }
  async getSports(req, res, next) {
    try {
      console.log(req.userAuth);
      const sportFound = await sportModel.find({}).lean();
      if (!sportFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: sportFound,
      });
    } catch (error) {
      next(error);
    }
  }
  async getSport(req, res, next) {
    try {
      const sportFound = await checkExistSport(req.params.id);

      if (!sportFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: sportFound,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateSport(req, res, next) {
    try {
      await checkExistSport(req.params.id);

      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data);

      // validate
      await sportSchemaUpdate.validateAsync(data);

      const { name } = data;

      // find sport
      if (name) {
        const sportFound = await sportModel.findOne({ name });
        if (sportFound) throw createError.Conflict("رشته ورزشی تکراری می باشد");
      }

      // update
      const sportUpdated = await sportModel.updateOne({ _id: req.params.id }, data);
      if (!sportUpdated) throw createError.InternalServerError("بروزرسانی رشته ورزشی با خطا مواجه شد");

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "بروزرسانی رشته ورزشی با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteSport(req, res, next) {
    try {
      await checkExistSport(req.params.id);

      const deletedSport = await sportModel.deleteOne({ _id: req.params.id });
      console.log(deletedSport);
      if (!deletedSport.deletedCount) throw createError.InternalServerError("حذف رشته ورزشی با خطا مواجه شد");

      await clubModel.updateMany({ sportID: req.params.id }, { $pull: { sportID: req.params.id } });

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "حذف رشته ورزشی با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistSport(id) {
    if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

    // find Sports
    const sportFound = await sportModel.findById(id).lean();
    if (!sportFound) throw createError.NotFound("رشته ورزشی مورد نظر یافت نشد");
    return sportFound;
  }
}

module.exports = new SportController();
