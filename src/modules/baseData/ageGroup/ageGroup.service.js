const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");

const { AgeGroupMessage } = require("./ageGroup.message");
const { AgeGroupModel } = require("./ageGroup.model");

class AgeGroupService {
  #Model;
  constructor() {
    this.#Model = AgeGroupMessage;
  }
  async create(bodyData) {
    const resultCreateAgeGroup = await this.#Model.create({
      ...bodyData,
    });
    if (!resultCreateAgeGroup) throw createHttpError.InternalServerError("ثبت رده سنی با خطا مواجه شد");
  }
  async find() {
    const ageGroups = await this.#Model.find({}).lean();
    if (!ageGroups) throw createHttpError.InternalServerError("دریافت رده سنی با خطا مواجه شد");
    return ageGroups;
  }

  async update(bodyData, ageGroupID) {
    const updateResult = await this.#Model.updateOne(
      { _id: ageGroupID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(AgeGroupMessage.UpdateError);
  }
  async remove(ageGroupID) {
    const removeResult = await this.#Model.deleteOne({ _id: ageGroupID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(AgeGroupMessage.DeleteError);
  }

  async assignAgeGroupStudentByBirthday(birthDay) {
    const ageGroups = await this.#Model.find({ $and: [{ toDate: { $gt: birthDay } }, { fromDate: { $lt: birthDay } }] });

    if (ageGroups.length == 3) return ageGroups.slice(0, 3);
    if (ageGroups.length == 2) return ageGroups.slice(0, 2);
    if (ageGroups.length == 1) return ageGroups.slice(0, 1);
  }

  async checkExistAgeGroupByName(name) {
    const result = await this.#Model.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(AgeGroupMessage.AlreadyExist);
  }
  async checkExistAgeGroupByID(ageGroupID) {
    if (!isValidObjectId(ageGroupID)) throw createHttpError.InternalServerError("age group object id is not valid");
    const result = await this.#Model.findById(ageGroupID).lean();
    if (!result) throw createHttpError.NotFound(AgeGroupMessage.NotFound);
    return result;
  }
}

module.exports = new AgeGroupService();
