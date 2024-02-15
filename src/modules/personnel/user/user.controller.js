const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");
const { validate } = require("../../../common/middlewares/validateExpressValidator");

const userService = require("./user.service");
const { UserMessage } = require("./user.message");
const { generateJWTToken } = require("../../../common/services/tokenServices");
const { matchedData } = require("express-validator");

class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = userService;
  }
  async register(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const resultCreateUser = await this.#service.register(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: UserMessage.Register,
        data: {
          accessToken: generateJWTToken({ id: resultCreateUser._id }),
        },
      });
    } catch (error) {
      req.body.imageUrl && deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }
  async login(req, res, next) {
    try {
      const { identifier, password } = req.body;
      const token = await this.#service.login(identifier, password);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: UserMessage.Register,
        data: {
          accessToken: token,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  // async logout(req, res, next) {
  //   try {
  //     res.clearCookie("access_token");
  //     res.redirect("/login");
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async userProfile(req, res, next) {
  //   try {
  //     res.status(StatusCodes.OK).json({
  //       status: "success",
  //       message: "دریافت اطلاعات با موفقیت انجام شد",
  //       data: req.userAuth,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
  // async updateUser(req, res, next) {
  //   try {
  //     const data = copyObject(req.body);
  //     const blackListFields = ["role"];
  //     deleteInvalidPropertyInObject(data, blackListFields);

  //     const { password } = data;
  //     let profileUpdateResult = null;

  //     if (password) {
  //       const hashedPassword = await hashPassword(password);
  //       profileUpdateResult = await UserModel.updateOne({ _id: req.userAuth._id }, { $set: { ...data, password: hashedPassword } });
  //     } else {
  //       profileUpdateResult = await UserModel.updateOne({ _id: req.userAuth._id }, { $set: data });
  //     }
  //     if (!profileUpdateResult.modifiedCount) throw new createError.InternalServerError("به روزسانی انجام نشد");

  //     res.status(StatusCodes.OK).json({
  //       status: "success",
  //       message: "ویرایش کاربر با موفقیت انجام شد",
  //       data: req.userAuth,
  //     });
  //   } catch (error) {
  //     next(error);
  //   }
  // }
}

module.exports = new UserController();
