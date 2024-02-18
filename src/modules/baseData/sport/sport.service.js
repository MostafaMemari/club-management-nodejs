const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");

const { SportModel } = require("./sport.model");
const { SportMessage } = require("./sport.message");

class SportService {
  #Model;
  constructor() {
    this.#Model = SportModel;
  }
  async create(bodyData) {
    const resultSportCreate = await this.#Model.create({
      ...bodyData,
    });
    if (!resultSportCreate) throw createHttpError.InternalServerError("رشته ورزشی با خطا مواجه شد");
  }
  async find() {
    const sports = await this.#Model.find({}).lean();
    if (!sports) throw createHttpError.InternalServerError("دریافت رشته ورزشی با خطا مواجه شد");
    return sports;
  }

  async update(bodyData, beltID) {
    const updateResult = await this.#Model.updateOne(
      { _id: beltID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(SportMessage.UpdateError);
  }
  async remove(beltID) {
    const removeResult = await this.#Model.deleteOne({ _id: beltID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(SportMessage.DeleteError);
  }

  async checkExistSportByName(name) {
    const result = await this.#Model.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(SportMessage.AlreadyExist);
  }

  async checkExistSportByID(sportID) {
    if (!isValidObjectId(sportID)) throw createHttpError.InternalServerError("sport object id is not valid");
    const result = await this.#Model.findById(sportID).lean();
    if (!result) throw createHttpError.NotFound(`${SportMessage.NotFound} ${sportID}`);
    return result;
  }
}

module.exports = new SportService();
