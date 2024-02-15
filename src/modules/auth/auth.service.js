const createHttpError = require("http-errors");

const { comparePassword } = require("../../common/services/passwordServices");
const { generateJWTToken } = require("../../common/services/tokenServices");
const autoBind = require("auto-bind");
const { UserModel } = require("../user/user.model");
const { AuthMessage } = require("./auth.message");

class AuthService {
  #userModel;
  constructor() {
    autoBind(this);
    this.#userModel = UserModel;
  }
  async userLogin(identifier, password) {
    const userExist = await this.#userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!userExist) throw createHttpError.Unauthorized(AuthMessage.Unauthorized);

    const isPasswordValid = await comparePassword(password, userExist.password);
    if (!isPasswordValid) throw createHttpError.Unauthorized(AuthMessage.Unauthorized);

    const accessToken = generateJWTToken({ id: userExist._id });

    return accessToken;
  }
}

module.exports = new AuthService();
