const createHttpError = require("http-errors");
const { RoleModel } = require("./role.model");

class RoleService {
  async create(bodyData) {
    const resultRoleCreate = await RoleModel.create({
      ...bodyData,
    });
    if (!resultRoleCreate) throw createHttpError.InternalServerError("ثبت سطح دسترسی با خطا مواجه شد");
  }
}

module.exports = new RoleService();
