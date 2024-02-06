const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const autoBind = require("auto-bind");

const { copyObject, deleteInvalidPropertyInObject } = require("../../../api/helpers/function");
const { beltSchema } = require("../../../api/validations/clubSchema");
const { studentModel } = require("../../personnel/student/studentModel");
const { beltModel } = require("./beltModel");

class BeltController {
  constructor() {
    autoBind(this);
  }
  async createBelt(req, res, next) {
    try {
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data);

      // validate
      await beltSchema.validateAsync(data);

      const { name } = data;

      // find belt
      const beltFound = await beltModel.findOne({ name });
      if (beltFound) throw createError.Conflict("کمربند وارد شده تکراری می باشد");

      // create
      const beltCreated = new beltModel(data);
      await beltCreated.save();
      if (!beltCreated) throw createError.InternalServerError("ثبت کمربند جدید با خطا مواجه شد");

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "ثبت کمربند با موفقیت انجام شد",
        beltCreated,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBelt(req, res, next) {
    try {
      await this.checkExistBelts(req.params.id);

      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data);

      const { name, duration } = data;

      // validate duration
      if (isNaN(duration)) throw createError.BadRequest("مدت زمان وارد شده معتبر نمی باشد");

      // validate name
      if (name) {
        const beltFound = await beltModel.findOne({ name });
        if (beltFound) throw createError.Conflict("کمربند وارد شده تکراری می باشد");
      }

      // updated
      const beltUpdated = await beltModel.updateOne({ _id: req.params.id }, data);
      if (!beltUpdated.modifiedCount) throw createError.InternalServerError("ویرایش کمربند با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "کمربند با موفقیت ویرایش شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteBelt(req, res, next) {
    try {
      await this.checkExistBelts(req.params.id);

      const deletedBelt = await beltModel.deleteOne({ _id: req.params.id });
      if (!deletedBelt.deletedCount) throw createError.InternalServerError("حذف رده کمربند با خطا مواجه شد");

      await studentModel.updateMany({ beltID: req.params.id }, { $unset: { beltID: 1 } });

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "حذف کمربند با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getBelt(req, res, next) {
    try {
      await this.checkExistBelts(req.params.id);

      const beltFound = await beltModel.findById(req.params.id).select("-duration").lean();
      if (!beltFound) throw createError.InternalServerError("دریافت کمربند با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت کمربند با موفقیت انجام شد",
        data: beltFound,
      });
    } catch (error) {
      next(error);
    }
  }
  async getBelts(req, res, next) {
    try {
      const beltsFound = await beltModel.find({}).select("-duration").lean();
      if (!beltsFound) throw createError.InternalServerError("دریافت کمربند با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت کمربند با موفقیت انجام شد",
        data: beltsFound,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistBelts(id) {
    if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

    // find Belt
    const beltFound = await beltModel.findById(id);
    if (!beltFound) throw createError.NotFound("کمربند وارد شده یافت نشد");
    return beltFound;
  }
}

module.exports = new BeltController();
