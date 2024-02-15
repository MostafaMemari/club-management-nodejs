const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

const AuthService = require("./auth.service");
const { AuthMessage } = require("./auth.message");

class AuthController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = AuthService;
  }

  async userLogin(req, res, next) {
    try {
      const { identifier, password } = req.body;
      const token = await this.#service.userLogin(identifier, password);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: AuthMessage.UserLogin,
        data: {
          accessToken: token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async studentLogin(req, res, next) {
    try {
      const { nationalID } = req.body;
      const token = await this.#service.studentLogin(nationalID);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: AuthMessage.StudentLogin,
        data: {
          accessToken: token,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
