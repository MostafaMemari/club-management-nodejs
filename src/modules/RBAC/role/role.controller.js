const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const autoBind = require("auto-bind");

const { copyObject, deleteInvalidPropertyInObject, validateItemArrayModel } = require("../../../api/helpers/function");
const { roleSchema } = require("../../../api/validations/RBAC.Schema");
const { roleModel } = require("../../models/RBAC/roleModel");
const { permissionModel } = require("../../models/RBAC/permissionModel");

class RoleController {
  constructor() {
    autoBind(this);
  }
  async createRole(req, res, next) {
    try {
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data);

      // validate
      const { title } = await roleSchema.validateAsync(data);
      if (!title) throw createError.BadRequest("عنوان نقش نمی تواند خالی باشد");

      await this.checkExistRoleTitle(title);

      // Normalize Permission
      let permissionsID = data.permissions || [];
      permissionsID = typeof permissionsID == "string" ? permissionsID.replace(/\s/g, "").split(" ") : permissionsID;
      // find And Validate Permission
      const permissions = await validateItemArrayModel(permissionModel, permissionsID);

      // create
      const roleFound = new roleModel({ ...data, permissions });
      await roleFound.save();
      if (!roleFound) throw createError.InternalServerError("ثبت نقش با خطا مواجه شد");

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "ثبت نقش با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async updateRole(req, res, next) {
    try {
      await this.checkExistRoleID(req.params.id);

      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data, ["permissions"]);

      // validate
      await roleSchema.validateAsync(data);

      const { name } = data;
      // find role
      if (name) {
        const roleFound = await roleModel.findOne({ name });
        if (roleFound) throw createError.Conflict("نقش وارد شده تکراری می باشد");
      }

      // update
      const roleUpdated = await roleModel.updateOne({ _id: req.params.id }, data);
      if (!roleUpdated) throw createError.InternalServerError("بروزرسانی رشته ورزشی با خطا مواجه شد");

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "بروزرسانی رشته ورزشی با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getRoles(req, res, next) {
    try {
      const roleFound = await roleModel.find({}).populate("permissions").lean();
      if (!roleFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: roleFound,
      });
    } catch (error) {
      next(error);
    }
  }
  async getRole(req, res, next) {
    try {
      const roleFound = await this.checkExistRoleID(req.params.id);

      if (!roleFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: roleFound,
      });
    } catch (error) {
      next(error);
    }
  }
  async deleteRole(req, res, next) {
    try {
      await this.checkExistRoleID(req.params.id);

      const deletedRole = await roleModel.deleteOne({ _id: req.params.id });
      if (!deletedRole.deletedCount) throw createError.InternalServerError("حذف نقش با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "حذف نقش با موفقیت انجام شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async addPermissionToRole(req, res, next) {
    try {
      const data = copyObject(req.body);
      const blackListFields = ["title", "description"];
      deleteInvalidPropertyInObject(data, blackListFields);

      // validate
      await this.checkExistRoleID(req.params.id);

      // Normalize Permission
      let permissionsID = data.permissions || [];
      permissionsID = typeof permissionsID == "string" ? permissionsID.replace(/\s/g, "").split(" ") : permissionsID;
      // find And Validate Permission
      const permissions = await validateItemArrayModel(permissionModel, permissionsID);

      // add belt to BeltExam
      const roleUpdated = await roleModel.updateOne({ _id: req.params.id }, { $addToSet: { permissions } });
      if (!roleUpdated.modifiedCount) throw createError.InternalServerError("ایجاد سطح دسترسی نقش با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "سطح دسترسی مورد نظر با موفقیت به نقش اختصاص یافت",
      });
    } catch (error) {
      next(error);
    }
  }
  async removePermissionToRole(req, res, next) {
    try {
      const data = copyObject(req.body);
      const blackListFields = ["title", "description"];
      deleteInvalidPropertyInObject(data, blackListFields);

      const { id: roleID, permissionID } = req.params;

      // validate
      if (!isValidObjectId(permissionID)) throw createError.BadRequest("شناسه سطح دسترسی معتبر نمی باشد");

      // find belt exam
      const roleFound = await this.checkExistRoleID(roleID);

      // find belt
      if (permissionID) {
        const permissionFound = await permissionModel.findById(permissionID).lean();
        if (!permissionFound) throw createError.NotFound("سطح دسترسی وارد شده صحیح نمی باشد");
      }

      const permissionArr = roleFound.permissions.map((objectId) => objectId.toString());
      // check Permission in Role
      if (!permissionArr.includes(permissionID)) throw createError.NotFound("سطح دسترسی وارد شده یافت نشد");

      // remove Permission
      const removePermossion = await roleModel.updateOne({ _id: roleID }, { $pull: { permissions: permissionID } });
      if (!removePermossion.modifiedCount) throw createError.InternalServerError("حذف سطح دسترسی با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "سطح دسترسی مورد نظر با موفقیت از نقش حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistRoleID(id) {
    if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

    // find Role
    const roleFound = await roleModel.findById(id).lean();
    if (!roleFound) throw createError.NotFound("نقش مورد نظر یافت نشد");
    return roleFound;
  }
  async checkExistRoleTitle(title) {
    // find Role
    const roleFound = await roleModel.findOne({ title });
    if (roleFound) throw createError.NotFound("نقش مورد نظر تکراری می باشد");
    return roleFound;
  }
}

module.exports = new RoleController();
