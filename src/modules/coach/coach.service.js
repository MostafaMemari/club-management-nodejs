const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");

const { CoachModel } = require("./coach.model");
const { CoachMessage } = require("./coach.message");

class CoachService {
  async register(bodyData) {
    const coachCreated = await CoachModel.create({
      ...bodyData,
    });
    if (!coachCreated) throw createHttpError.InternalServerError("ثبت نام با خطا مواجه شد");
  }
  async find() {
    const coachs = await CoachModel.find({}).lean();

    if (!coachs) throw createHttpError.InternalServerError("دریافت رده سنی با خطا مواجه شد");
    return coachs;
  }

  async update(bodyData, paramData) {
    await this.checkExistCoachByID(paramData.id);
    const coachCreated = await CoachModel.updateOne({ _id: paramData.id }, { ...bodyData });
    if (!coachCreated.modifiedCount) throw createHttpError.InternalServerError();
  }
  async findByID(coachID) {
    const coach = await CoachModel.findById(coachID).populate("clubs").lean();

    if (!coach) throw createHttpError.InternalServerError();
    return coach;
  }
  async remove(coachID) {
    const removeResult = await CoachModel.deleteOne({ _id: coachID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(CoachMessage.DeleteError);
  }

  async checkExistCoachByID(coachID) {
    if (!isValidObjectId(coachID)) throw createHttpError.BadRequest("coach id is not valid");
    const coach = await CoachModel.findById(coachID).populate("clubs").lean();
    if (!coach) throw createHttpError.NotFound("coach not found");
    return coach;
  }
  async checkExistCoachByNationalID(nationalID) {
    const coach = await CoachModel.findOne({ nationalID }).lean();
    if (coach) throw createHttpError.Conflict(CoachMessage.AlreadyExist);
  }
}

module.exports = new CoachService();
