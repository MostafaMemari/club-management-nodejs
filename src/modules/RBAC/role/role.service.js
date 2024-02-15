const createHttpError = require("http-errors");
const { RoleModel } = require("./role.model");
const { isValidObjectId } = require("mongoose");
const { RoleMessage } = require("./role.message");

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
  async removeRoleRole(roleID) {
    await RoleModel.updateMany({}, { roles: roleID });
  }

  async update(bodyData, roleID) {
    const updateResult = await RoleModel.updateOne(
      { _id: roleID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(RoleMessage.UpdateError);
  }
  async remove(roleID) {
    const removeResult = await RoleModel.deleteOne({ _id: roleID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(RoleMessage.DeleteError);
  }

  async removeAllPermissionsInRole(permissionsID) {
    await RoleModel.updateMany({}, { $pull: { permissions: permissionsID } });
  }

  async checkExistRoleByName(name) {
    const result = await RoleModel.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(RoleMessage.AlreadyExist);
  }
  async checkExistRoleByID(roleID) {
    if (!isValidObjectId(roleID)) throw createHttpError.InternalServerError("role object id is not valid");
    const result = await RoleModel.findById(roleID).lean();
    if (!result) throw createHttpError.NotFound(RoleMessage.NotFound);
    return result;
  }
}

module.exports = new RoleService();
