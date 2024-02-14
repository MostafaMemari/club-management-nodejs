const createHttpError = require("http-errors");
const { PermissionModel } = require("./permission.model");
const { isValidObjectId } = require("mongoose");
const { PermissionMessage } = require("./permission.message");

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
  async update(bodyData, permissionID) {
    const updateResult = await PermissionModel.updateOne(
      { _id: permissionID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(PermissionMessage.UpdateError);
  }
  async remove(permissionID) {
    const removeResult = await PermissionModel.deleteOne({ _id: permissionID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(PermissionMessage.DeleteError);
  }

  async checkExistPermissionByName(name) {
    const result = await PermissionModel.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(PermissionMessage.AlreadyExist);
  }
  async checkExistPermissionByID(permissionID) {
    if (!isValidObjectId(permissionID)) throw createHttpError.InternalServerError("permission object id is not valid");
    const result = await PermissionModel.findById(permissionID).lean();
    if (!result) throw createHttpError.NotFound(PermissionMessage.NotFound);
    return result;
  }
}

module.exports = new PermissionService();
