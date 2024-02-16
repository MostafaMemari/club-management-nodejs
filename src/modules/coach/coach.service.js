const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");

const { CoachModel } = require("./coach.model");
const { CoachMessage } = require("./coach.message");
const autoBind = require("auto-bind");
const { UserModel } = require("../user/user.model");

class CoachService {
  #Model;
  #UserModel;
  constructor() {
    autoBind(this);
    this.#Model = CoachModel;
    this.#UserModel = UserModel;
  }
  async register(bodyData, userAuth) {
    const coachCreated = await this.#Model.create({
      ...bodyData,
      createdBy: userAuth._id,
    });
    if (!coachCreated) throw createHttpError.InternalServerError();
    return coachCreated;
  }

  async find(userAuth) {
    const coachs =
      userAuth.role === "ADMIN_CLUB"
        ? await this.#Model.find({ _id: { $in: userAuth?.coachs } })
        : userAuth.role === "SUPER_ADMIN"
        ? await this.#Model.find({}).lean()
        : "";

    if (!coachs) throw createHttpError.InternalServerError();
    return coachs;
  }

  async update(bodyData, paramData) {
    await this.checkExistCoachByID(paramData.id);
    const coachCreated = await this.#Model.updateOne({ _id: paramData.id }, { ...bodyData });
    if (!coachCreated.modifiedCount) throw createHttpError.InternalServerError();
  }
  async findByID(coachID) {
    const coach = await this.#Model.findById(coachID).populate("clubs").lean();

    if (!coach) throw createHttpError.InternalServerError();
    return coach;
  }
  async remove(coachID) {
    const removeResult = await this.#Model.deleteOne({ _id: coachID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(CoachMessage.DeleteError);
  }

  async checkExistCoachByID(coachID) {
    if (!isValidObjectId(coachID)) throw createHttpError.BadRequest("coach id is not valid");
    const coach = await this.#Model.findById(coachID).populate("clubs").lean();
    if (!coach) throw createHttpError.NotFound("coach not found");
    return coach;
  }
  async checkExistCoachByNationalCode(nationalCode) {
    const coach = await this.#Model.findOne({ nationalCode }).lean();
    if (coach) throw createHttpError.Conflict(CoachMessage.AlreadyExist);
  }
}

module.exports = new CoachService();
