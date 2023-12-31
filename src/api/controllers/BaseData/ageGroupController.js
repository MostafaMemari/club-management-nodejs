const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const autoBind = require("auto-bind");

const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { studentModel } = require("../../models/Personnel/studentModel");
const { ageGroupSchema, ageGroupUpdateSchema } = require("../../validations/clubSchema");
const { ageGroupModel } = require("../../models/BaseData/ageGroupModel");

class AgeGroupController {
  constructor() {
    autoBind(this);
  }
  async createAgeGourp(req, res, next) {
    try {
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data);

      // validate
      await ageGroupSchema.validateAsync(data);

      const { name } = data;

      // find sport
      const ageGroupFound = await ageGroupModel.findOne({ name });
      if (ageGroupFound) throw createError.Conflict("رده سنی وارد شده تکراری می باشد");

      // create
      const ageGroupCreated = new ageGroupModel(data);
      await ageGroupCreated.save();
      if (!ageGroupCreated) throw createError.InternalServerError("ثبت رده سنی جدید با خطا مواجه شد");

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "رشته ورزشی مورد نظر با موفقیت ثبت شد",
        ageGroupCreated,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateAgeGourp(req, res, next) {
    try {
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data);

      // validate
      await ageGroupUpdateSchema.validateAsync({ ...data, id: req.params.id });

      const { name } = data;

      await this.checkExistAgeGroup(req.params.id);

      // validate name
      if (name) {
        const ageGroupFound = await ageGroupModel.findOne({ name });
        if (ageGroupFound) throw createError.Conflict("رده سنی وارد شده تکراری می باشد");
      }

      // updated
      const ageGroupUpdated = await ageGroupModel.updateOne({ _id: req.params.id }, data);
      if (!ageGroupUpdated.modifiedCount) throw createError.InternalServerError("ویرایش رده سنی با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "رده سنی با موفقیت ویرایش شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteAgeGroup(req, res, next) {
    try {
      await this.checkExistAgeGroup(req.params.id);

      const deletedAgeGroup = await ageGroupModel.deleteOne({ _id: req.params.id });
      if (!deletedAgeGroup.deletedCount) throw createError.InternalServerError("حذف زده سنی با خطا مواجه شد");

      await studentModel.updateMany({ ageGroupID: req.params.id }, { $pull: { ageGroupID: req.params.id } });

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "حذف رده سنی با موفقیت انجام شد",
        reuslt,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAgeGroup(req, res, next) {
    try {
      if (!isValidObjectId(req.params.id)) throw createError.BadRequest("شناسه وارد شده رده سنی صحیح نمی باشد");

      const ageGroupFound = await ageGroupModel.findById(req.params.id).select("-fromDateEN -toDateEN").lean();
      if (!ageGroupFound) throw createError.InternalServerError("دریافت رده سنی با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت رده های سنی با موفقیت انجام شد",
        data: ageGroupFound,
      });
    } catch (error) {
      next(error);
    }
  }
  async getAgeGroups(req, res, next) {
    try {
      const ageGroups = await ageGroupModel.find({}).select("-fromDateEN -toDateEN").lean();
      if (!ageGroups) throw createError.InternalServerError("دریافت رده های سنی با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت رده های سنی با موفقیت انجام شد",
        data: ageGroups,
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistAgeGroup(id) {
    if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

    // find age group
    const ageGroupFound = await ageGroupModel.findById(id);
    if (!ageGroupFound) throw createError.NotFound("رده سنی وارد شده یافت نشد");
  }
}

module.exports = new AgeGroupController();
