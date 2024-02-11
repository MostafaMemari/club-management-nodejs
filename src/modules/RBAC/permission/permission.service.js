const createHttpError = require("http-errors");
const { PermissionModel } = require("./permission.model");

class PermissionService {
  async create(bodyData) {
    const resultPermissionCreate = await PermissionModel.create({
      ...bodyData,
    });
    if (!resultPermissionCreate) throw createHttpError.InternalServerError("ثبت سطح دسترسی با خطا مواجه شد");
  }
  async find() {
    const permissions = await PermissionModel.find({}).lean();
    if (!permissions) throw createHttpError.InternalServerError("دریافت سطح دسترسی با خطا مواجه شد");
    return permissions;
  }
}

module.exports = new PermissionService();
