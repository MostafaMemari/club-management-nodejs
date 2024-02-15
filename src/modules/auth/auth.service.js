const createHttpError = require("http-errors");

const { comparePassword } = require("../../common/services/passwordServices");
const { generateJWTToken } = require("../../common/services/tokenServices");
const autoBind = require("auto-bind");
const { UserModel } = require("../user/user.model");
const { AuthMessage } = require("./auth.message");
const { StudentModel } = require("../student/student.model");

class AuthService {
  #userModel;
  #studentModel;
  constructor() {
    autoBind(this);
    this.#userModel = UserModel;
    this.#studentModel = StudentModel;
  }
  async userLogin(identifier, password) {
    const userExist = await this.#userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!userExist) throw createHttpError.Unauthorized(AuthMessage.UnauthorizedUser);

    const isPasswordValid = await comparePassword(password, userExist.password);
    if (!isPasswordValid) throw createHttpError.Unauthorized(AuthMessage.UnauthorizedUser);

    const accessToken = generateJWTToken({ id: userExist._id });

    return accessToken;
  }
  async studentLogin(nationalID) {
    const studentExist = await this.#studentModel.findOne({ nationalID });
    if (!studentExist) throw createHttpError.Unauthorized(AuthMessage.UnauthorizedStudent);

    const accessToken = generateJWTToken({ id: studentExist._id });

    return accessToken;
  }
}

module.exports = new AuthService();
