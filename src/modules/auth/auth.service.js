const createHttpError = require("http-errors");

const { comparePassword } = require("../../common/services/passwordServices");
const { generateJWTToken } = require("../../common/services/tokenServices");
const autoBind = require("auto-bind");
const { UserModel } = require("../user/user.model");
const { AuthMessage } = require("./auth.message");
const { StudentModel } = require("../student/student.model");
const { CoachModel } = require("../coach/coach.model");

class AuthService {
  #userModel;
  #studentModel;
  #coachModel;
  constructor() {
    autoBind(this);
    this.#userModel = UserModel;
    this.#studentModel = StudentModel;
    this.#coachModel = CoachModel;
  }
  async userLogin(identifier, password) {
    const userExist = await this.#userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] }).select("password _id role");
    if (!userExist) throw createHttpError.Unauthorized(AuthMessage.UnauthorizedUser);

    const isPasswordValid = await comparePassword(password, userExist.password);
    if (!isPasswordValid) throw createHttpError.Unauthorized(AuthMessage.UnauthorizedUser);

    const accessToken = generateJWTToken({ id: userExist._id });

    return { accessToken, userExist };
  }
  async login(nationalCode) {
    const result = await this.findPersonByNationalCode(nationalCode);

    const accessToken = generateJWTToken({ id: result._id });

    return accessToken;
  }

  async findPersonByNationalCode(nationalCode) {
    const coach = await this.#coachModel.findOne({ nationalCode });
    if (coach) {
      return coach;
    }
    const student = await this.#studentModel.findOne({ nationalCode });
    if (student) {
      return student;
    }

    return null;
  }
}

module.exports = new AuthService();
