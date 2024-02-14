const createHttpError = require("http-errors");
const { BeltModel } = require("./belt.model");
const { isValidObjectId } = require("mongoose");
const { BeltMessage } = require("./belt.message");

class BeltService {
  async create(bodyData) {
    const resultBeltCreate = await BeltModel.create({
      ...bodyData,
    });
    if (!resultBeltCreate) throw createHttpError.InternalServerError();
  }
  async find() {
    const belts = await BeltModel.find({}).populate("nextBelt", "-nextBelt -_id").lean();
    if (!belts) throw createHttpError.InternalServerError();
    return belts;
  }

  async update(bodyData, beltID) {
    const updateResult = await BeltModel.updateOne(
      { _id: beltID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(BeltMessage.UpdateError);
  }
  async remove(beltID) {
    const removeResult = await BeltModel.deleteOne({ _id: beltID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(BeltMessage.DeleteError);
  }

  async checkExistBeltByID(beltID) {
    if (!isValidObjectId(beltID)) throw createHttpError.BadRequest("belt id is not valid");
    const belt = await BeltModel.findById(beltID).lean();
    if (!belt) throw createHttpError.NotFound(BeltMessage.NotFound);
    return belt;
  }
}

module.exports = new BeltService();
