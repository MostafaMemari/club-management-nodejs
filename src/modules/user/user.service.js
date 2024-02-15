const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { UserModel } = require("./user.model");
const { UserMessage } = require("./user.message");
const { hashPassword, comparePassword } = require("../../common/services/passwordServices");
const { generateJWTToken } = require("../../common/services/tokenServices");

class UserService {
  async register(bodyData) {
    const { username, password, email } = bodyData;

    const hashedPassword = await hashPassword(password);

    const userCreated = await UserModel.create({ username, password: hashedPassword, email });
    if (!userCreated) throw createHttpError.InternalServerError(UserMessage.RegisterError);
    return userCreated;
  }
  async login(identifier, password) {
    const userExist = await UserModel.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!userExist) throw createHttpError.Unauthorized(UserMessage.Unauthorized);

    const isPasswordValid = await comparePassword(password, userExist.password);
    if (!isPasswordValid) throw createHttpError.Unauthorized(UserMessage.Unauthorized);

    const accessToken = generateJWTToken({ id: userExist._id });

    return accessToken;
  }

  async checkExistUserByUsername(username) {
    const result = await UserModel.findOne({ username }).lean();
    if (result) throw createHttpError.Conflict("username already taken");
  }
  async checkExistUserByEmail(email) {
    const result = await UserModel.findOne({ email }).lean();
    if (result) throw createHttpError.Conflict("email already registered");
  }

  async checkExistUserByID(userID) {
    if (!isValidObjectId(userID)) throw createHttpError.InternalServerError("user object id is not valid");
    const result = await UserModel.findById(userID).lean();
    if (!result) throw createHttpError.NotFound(UserMessage.NotFound);
    return result;
  }
}

module.exports = new UserService();
