const createHttpError = require("http-errors");
const { BeltModel } = require("./belt.model");
const { isValidObjectId } = require("mongoose");

class BeltService {
  async create(bodyData) {
    const resultBeltCreate = await BeltModel.create({
      ...bodyData,
    });
    if (!resultBeltCreate) throw createHttpError.InternalServerError();
  }

  async update(bodyData, paramData) {
    const { id: beltID } = paramData;
    await this.checkExistBeltByID(beltID);
    const resultBeltUpdate = await BeltModel.updateOne(
      { _id: beltID },
      {
        ...bodyData,
      }
    );
    if (!resultBeltUpdate) throw createHttpError.InternalServerError();
  }

  async find() {
    const belts = await BeltModel.find({}).populate("nextBelt", "-nextBelt").lean();
    if (!belts) throw createHttpError.InternalServerError();
    return belts;
  }

  async checkExistBeltByID(id) {
    if (!isValidObjectId(id)) throw createHttpError.BadRequest("belt id is not valid");
    const belt = await BeltModel.findById(id).lean();
    if (!belt) throw createHttpError.NotFound("student not found");
    return belt;
  }
}

module.exports = new BeltService();
