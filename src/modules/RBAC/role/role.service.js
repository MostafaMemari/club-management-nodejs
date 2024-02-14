const createHttpError = require("http-errors");
const { RoleModel } = require("./role.model");

class RoleService {
  async create(bodyData) {
    const resultRoleCreate = await RoleModel.create({
      ...bodyData,
    });
    if (!resultRoleCreate) throw createHttpError.InternalServerError("ثبت سطح دسترسی با خطا مواجه شد");
  }
  async find() {
    const roles = await RoleModel.find({}).populate("permissions").lean();
    if (!roles) throw createHttpError.InternalServerError("دریافت نقش ها با خطا مواجه شد");
    return roles;
  }
  async removePermissionRole(permissionID) {
    await RoleModel.updateMany({}, { permissions: permissionID });
  }
}

module.exports = new RoleService();
