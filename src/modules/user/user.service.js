const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { UserModel } = require("./user.model");
const { UserMessage } = require("./user.message");
const { hashPassword, comparePassword } = require("../../common/services/passwordServices");
const { generateJWTToken } = require("../../common/services/tokenServices");
const { CoachModel } = require("../coach/coach.model");

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
  async login(identifier, password) {
    const userExist = await this.#Model.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!userExist) throw createHttpError.Unauthorized(UserMessage.Unauthorized);

    const isPasswordValid = await comparePassword(password, userExist.password);
    if (!isPasswordValid) throw createHttpError.Unauthorized(UserMessage.Unauthorized);

    const accessToken = generateJWTToken({ id: userExist._id });

    return accessToken;
  }

  async addCoachInUserAdminClub(userID, coachID) {
    console.log(userID, coachID);
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
