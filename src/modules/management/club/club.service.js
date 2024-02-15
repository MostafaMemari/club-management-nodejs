const createHttpError = require("http-errors");
const { ClubModel } = require("./club.model");
const { isValidObjectId } = require("mongoose");

class ClubService {
  async create(bodyData) {
    const resultClubCreate = await ClubModel.create({
      ...bodyData,
    });
    if (!resultClubCreate) throw createHttpError.InternalServerError("ثبت باشگاه با خطا مواجه شد");
  }

  async find() {
    const clubs = await ClubModel.find({}).populate("sports", "name").lean();
    if (!clubs) throw createHttpError.InternalServerError("دریافت باشگاه با خطا مواجه شد");
    return clubs;
  }

  async removeAllSportsInClub(sportID) {
    await ClubModel.updateMany({}, { $pull: { sports: sportID } });
  }

  async update(bodyData, beltID) {
    const updateResult = await ClubModel.updateOne(
      { _id: beltID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(ClubMessage.UpdateError);
  }
  async remove(beltID) {
    const removeResult = await ClubModel.deleteOne({ _id: beltID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(ClubMessage.DeleteError);
  }

  async checkExistClubByName(name) {
    const result = await ClubModel.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(ClubMessage.AlreadyExist);
  }

  async checkExistClubByID(sportID) {
    if (!isValidObjectId(sportID)) throw createHttpError.InternalServerError("sport object id is not valid");
    const result = await ClubModel.findById(sportID).lean();
    if (!result) throw createHttpError.NotFound(ClubMessage.NotFound);
    return result;
  }
}

module.exports = new ClubService();
