const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");

const { ClubModel } = require("./club.model");
const { ClubMessage } = require("./club.message");

class ClubService {
  #Model;
  constructor() {
    this.#Model = ClubModel;
  }
  async create(bodyData, userAuth) {
    const adminClub = userAuth.role === "SUPER_ADMIN" ? bodyData.amdinClub : userAuth.role === "ADMIN_CLUB" ? userAuth._id : "";

    const resultClubCreate = await this.#Model.create({
      ...bodyData,
      adminClub,
      createdBy: userAuth._id,
    });
    if (!resultClubCreate) throw createHttpError.InternalServerError();
    return resultClubCreate;
  }

  async find() {
    const clubs = await this.#Model.find({}).populate("sports", "name").lean();
    if (!clubs) throw createHttpError.InternalServerError("دریافت باشگاه با خطا مواجه شد");
    return clubs;
  }

  async removeAllSportsInClub(sportID) {
    await this.#Model.updateMany({}, { $pull: { sports: sportID } });
  }

  async update(bodyData, beltID) {
    const updateResult = await this.#Model.updateOne(
      { _id: beltID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(ClubMessage.UpdateError);
  }
  async remove(beltID) {
    const removeResult = await this.#Model.deleteOne({ _id: beltID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(ClubMessage.DeleteError);
  }

  async checkExistClubByName(name) {
    const result = await this.#Model.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(ClubMessage.AlreadyExist);
  }

  async checkExistClubByID(clubID) {
    if (!isValidObjectId(clubID)) throw createHttpError.InternalServerError("club object id is not valid");
    const result = await this.#Model.findById(clubID).lean();
    if (!result) throw createHttpError.NotFound(ClubMessage.NotFound);
    return result;
  }
}

module.exports = new ClubService();
