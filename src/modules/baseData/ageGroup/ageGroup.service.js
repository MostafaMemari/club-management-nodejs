const { isValidObjectId } = require("mongoose");
const { AgeGroupMessage } = require("./ageGroup.message");
const { AgeGroupModel } = require("./ageGroup.model");
const createHttpError = require("http-errors");

class AgeGroupService {
  async create(bodyData) {
    const resultCreateAgeGroup = await AgeGroupModel.create({
      ...bodyData,
    });
    if (!resultCreateAgeGroup) throw createHttpError.InternalServerError("ثبت رده سنی با خطا مواجه شد");
  }

  async find() {
    const ageGroups = await AgeGroupModel.find({}).lean();
    if (!ageGroups) throw createHttpError.InternalServerError("دریافت رده سنی با خطا مواجه شد");
    return ageGroups;
  }
  async assignAgeGroupStudentBybirthday(birthDay) {
    const ageGroups = await AgeGroupModel.find({ $and: [{ toDate: { $gt: birthDay } }, { fromDate: { $lt: birthDay } }] });

    if (ageGroups.length == 3) return ageGroups.slice(0, 3);
    if (ageGroups.length == 2) return ageGroups.slice(0, 2);
    if (ageGroups.length == 1) return ageGroups.slice(0, 1);
  }

  async checkExistAgeGroupByName(name) {
    const result = await AgeGroupModel.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(AgeGroupMessage.AlreadyExist);
  }
  async checkExistAgeGroupByID(id) {
    if (!isValidObjectId(id)) throw createHttpError.InternalServerError("age group object id is not valid");
    const result = await AgeGroupModel.findById(id).lean();
    if (!result) throw createHttpError.NotFound(AgeGroupMessage.NotFound);
    return result;
  }
}

module.exports = new AgeGroupService();
