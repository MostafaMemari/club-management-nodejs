const createHttpError = require("http-errors");
const { SportModel } = require("./sport.model");
const { SportMessage } = require("./sport.message");
const { getNextBeltDate } = require("../../../common/utils/function");
const { isValidObjectId } = require("mongoose");

class SportService {
  async create(bodyData) {
    const resultSportCreate = await SportModel.create({
      ...bodyData,
    });
    if (!resultSportCreate) throw createHttpError.InternalServerError("رشته ورزشی با خطا مواجه شد");
  }
  async find() {
    const sports = await SportModel.find({}).lean();
    if (!sports) throw createHttpError.InternalServerError("دریافت رشته ورزشی با خطا مواجه شد");
    return sports;
  }

  async update(bodyData, beltID) {
    const updateResult = await SportModel.updateOne(
      { _id: beltID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(SportMessage.UpdateError);
  }
  async remove(beltID) {
    const removeResult = await SportModel.deleteOne({ _id: beltID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(SportMessage.DeleteError);
  }

  async checkExistSportByName(name) {
    const result = await SportModel.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(SportMessage.AlreadyExist);
  }

  async checkExistSportByID(sportID) {
    if (!isValidObjectId(sportID)) throw createHttpError.InternalServerError("sport object id is not valid");
    const result = await SportModel.findById(sportID).lean();
    if (!result) throw createHttpError.NotFound(SportMessage.NotFound);
    return result;
  }
}

module.exports = new SportService();
