const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

const AuthService = require("./auth.service");
const { AuthMessage } = require("./auth.message");

const studentService = require("../student/student.service");
const coachService = require("../coach/coach.service");
const userService = require("../user/user.service");

class AuthController {
  #service;
  #studentService;
  #coachService;
  #userService;
  constructor() {
    autoBind(this);
    this.#service = AuthService;
    this.#studentService = studentService;
    this.#coachService = coachService;
    this.#userService = userService;
  }

  async userLogin(req, res, next) {
    try {
      const { identifier, password } = req.body;
      const { accessToken, userExist } = await this.#service.userLogin(identifier, password);

      // req.flash("success", category_message_1.CategoryMessage.Updated);
      return res.cookie("access_token", accessToken, { httpOnly: true, maxAge: 604800000 }).redirect("/");

      // res.status(200).json({
      //   status: "success",
      //   message: AuthMessage.UserLogin,
      //   data: {
      //     accessToken,
      //   },
      // });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { nationalCode } = req.body;
      const accessToken = await this.#service.login(nationalCode);

      return res.cookie("access_token", accessToken, { httpOnly: true, maxAge: 604800000 }).redirect("/");

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: AuthMessage.StudentLogin,
        data: {
          accessToken,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getme(req, res, next) {
    try {
      const userAuth = req.userAuth;
      let user = null;

      userAuth.role === "STUDENT"
        ? (user = await this.#studentService.findByID(userAuth._id))
        : userAuth.role === "COACH"
        ? (user = await this.#coachService.findByID(userAuth._id))
        : (user = await this.#userService.findByID(userAuth._id));

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: AuthMessage.StudentLogin,
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
