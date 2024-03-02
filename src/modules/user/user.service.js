const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");

const { UserModel } = require("./user.model");
const { UserMessage } = require("./user.message");
const { hashPassword } = require("../../common/services/passwordServices");

class UserService {
  #Model;
  constructor() {
    this.#Model = UserModel;
  }
  async register(bodyData) {
    const { username, password, email } = bodyData;

    const hashedPassword = await hashPassword(password);

    const userCreated = await this.#Model.create({ username, password: hashedPassword, email });
    if (!userCreated) throw createHttpError.InternalServerError(UserMessage.RegisterError);
    return userCreated;
  }

  async addClubInUserAdminClub(userID, clubID) {
    await this.#Model.updateOne({ _id: userID }, { $addToSet: { clubs: clubID } });
  }

  async addCoachInUserAdminClub(userID, coachID) {
    await this.#Model.updateOne({ _id: userID }, { $addToSet: { coachs: coachID } });
  }

  async checkExistUserByUsername(username) {
    const result = await this.#Model.findOne({ username }).lean();
    if (result) throw createHttpError.Conflict("username already taken");
  }
  async checkExistUserByEmail(email) {
    const result = await this.#Model.findOne({ email }).lean();
    if (result) throw createHttpError.Conflict("email already registered");
  }

  async checkExistUserByID(userID) {
    if (!isValidObjectId(userID)) throw createHttpError.InternalServerError("user object id is not valid");
    const result = await this.#Model.findById(userID).lean();
    if (!result) throw createHttpError.NotFound(UserMessage.NotFound);
    return result;
  }
}

module.exports = new UserService();
