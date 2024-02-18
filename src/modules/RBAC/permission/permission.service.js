const createHttpError = require("http-errors");
const { PermissionModel } = require("./permission.model");
const { isValidObjectId } = require("mongoose");
const { PermissionMessage } = require("./permission.message");

class PermissionService {
  #Model;
  constructor() {
    this.#Model = PermissionModel;
  }
  async create(bodyData) {
    const resultPermissionCreate = await this.#Model.create({
      ...bodyData,
    });
    if (!resultPermissionCreate) throw createHttpError.InternalServerError("ثبت سطح دسترسی با خطا مواجه شد");
  }
  async find() {
    const permissions = await this.#Model.find({}).lean();
    if (!permissions) throw createHttpError.InternalServerError("دریافت سطح دسترسی با خطا مواجه شد");
    return permissions;
  }
  async update(bodyData, permissionID) {
    const updateResult = await this.#Model.updateOne(
      { _id: permissionID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(PermissionMessage.UpdateError);
  }
  async remove(permissionID) {
    const removeResult = await this.#Model.deleteOne({ _id: permissionID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(PermissionMessage.DeleteError);
  }

  async checkExistPermissionByName(name) {
    const result = await this.#Model.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(PermissionMessage.AlreadyExist);
  }
  async checkExistPermissionByID(permissionID) {
    if (!isValidObjectId(permissionID)) throw createHttpError.InternalServerError("permission object id is not valid");
    const result = await this.#Model.findById(permissionID).lean();
    if (!result) throw createHttpError.NotFound(PermissionMessage.NotFound);
    return result;
  }
}

module.exports = new PermissionService();
