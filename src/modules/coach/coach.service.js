const createHttpError = require("http-errors");
const autoBind = require("auto-bind");
const { isValidObjectId } = require("mongoose");

const { CoachModel } = require("./coach.model");
const { CoachMessage } = require("./coach.message");
const { UserModel } = require("../user/user.model");
const { ClubModel } = require("../club/club.model");

class CoachService {
  #Model;
  #UserModel;
  #ClubModel;
  constructor() {
    autoBind(this);
    this.#Model = CoachModel;
    this.#UserModel = UserModel;
    this.#ClubModel = ClubModel;
  }
  async register(bodyData, userAuth) {
    if (userAuth.role === "ADMIN_CLUB") await this.validateClubAndGenderCoachByClubAdmin(userAuth._id, bodyData);

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

  async addCoachInClub(clubID, coachID) {
    await this.#Model.updateOne({ _id: coachID }, { $addToSet: { clubs: clubID } });
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

  async checkClubInCoach(coachID, clubID) {
    const coach = await this.#Model.findById(coachID);
    if (!coach?.clubs.includes(clubID)) {
      throw createHttpError.BadRequest("check club!");
    }
  }

  async validateClubAndGenderCoachByClubAdmin(adminClubID, bodyData) {
    const clubsAndGender = await this.#ClubModel.find({ adminClub: adminClubID }).select("genders , _id");

    const clubs = clubsAndGender.map((club) => club._id.toString());

    for (const club of bodyData.clubs) {
      if (!clubs.includes(club.toString())) throw createHttpError.BadRequest("your entered club is not found admin club");
    }

    const genders = clubsAndGender.map((club) => club.genders);
    await this.checkGenderCoachIsClub(bodyData.gender, genders);
  }
  async checkGenderCoachIsClub(genderCoach, gendersClub) {
    genderCoach = genderCoach === "مرد" ? "آقایان" : genderCoach === "زن" ? "بانوان" : "";

    for (const genderClub of gendersClub) {
      if (!genderClub.includes(genderCoach)) throw createHttpError.BadRequest("gender coach is club not valid");
    }
  }
}

module.exports = new CoachService();
