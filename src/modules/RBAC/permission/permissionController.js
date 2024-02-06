const autoBind = require("auto-bind");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { isValidObjectId } = require("mongoose");

const { copyObject, deleteInvalidPropertyInObject } = require("../../../api/helpers/function");
const { permissionSchema } = require("../../../api/validations/RBAC.Schema");
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
