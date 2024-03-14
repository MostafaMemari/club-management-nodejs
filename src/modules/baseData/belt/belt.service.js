const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");

const { BeltModel } = require("./belt.model");
const { BeltMessage } = require("./belt.message");

class BeltService {
  #Model;
  constructor() {
    this.#Model = BeltModel;
  }
  async create(bodyData) {
    const resultBeltCreate = await this.#Model.create({
      ...bodyData,
    });
    if (!resultBeltCreate) throw createHttpError.InternalServerError();
  }
  async find() {
    const belts = await this.#Model.find({}, { nextBelt: 0 }).sort({ duration: 1 }).lean();
    if (!belts) throw createHttpError.InternalServerError();
    return belts;
  }

  async update(bodyData, beltID) {
    const updateResult = await this.#Model.updateOne(
      { _id: beltID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(BeltMessage.UpdateError);
  }
  async remove(beltID) {
    const removeResult = await this.#Model.deleteOne({ _id: beltID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(BeltMessage.DeleteError);
  }

  async checkExistBeltByID(beltID) {
    if (!isValidObjectId(beltID)) throw createHttpError.BadRequest("belt id is not valid");
    const belt = await this.#Model.findById(beltID).lean();
    if (!belt) throw createHttpError.NotFound(BeltMessage.NotFound);
    return belt;
  }
}

module.exports = new BeltService();
