const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const autoBind = require("auto-bind");

const { userModel } = require("../../models/Personnel/userModel");
const { userRegisterSchema } = require("../authSchema");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../common/utils/function");
const { hashPassword, isPassMatched } = require("../../../common/services/passwordServices");
const { generateToken } = require("../../../common/services/tokenServices");

class UserController {
  constructor() {
    autoBind;
  }
  async registerUser(req, res, next) {
    try {
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data);

      await userRegisterSchema.validateAsync(data);
      const { username, password, email } = data;

      // check user found
      const userFound = await userModel.findOne({ $or: [{ username }, { email }] });
      if (userFound) throw createError.Conflict("کاربر با این مشخصات قبلاً ثبت شده است");

      // hash password
      const hashedPassword = await hashPassword(password);

      // create new user
      const userCreated = await userModel.create({ username, password: hashedPassword, email });
      if (!userCreated) throw createError.InternalServerError("ثبت نام کاربر با خطا مواجه شد");

      const userObject = userCreated.toObject();
      Reflect.deleteProperty(userObject, "password");

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "ثبت نام کاربر با موفقیت انجام شد",
        data: {
          userObject,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async loginUser(req, res, next) {
    try {
      const data = copyObject(req.body);

      const { identifier, password } = data;

      // check user found
      const userFound = await userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] });
      if (!userFound) throw createError.Unauthorized("نام کاربری یا کلمه عبور وارد شده اشتباه است");

      // check valid password
      const isValidPassword = await isPassMatched(password, userFound.password);
      if (!isValidPassword) throw createError.Unauthorized("نام کاربری یا کلمه عبور وارد شده اشتباه است");

      const token = generateToken({ id: userFound._id });

      res.json(token);

      //   res.cookie("access_token", token, {
      //     httpOnly: true,
      //     secure: true, // production => true
      //   });
      //   res.redirect("/dashboard");
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
      res.clearCookie("access_token");
      res.redirect("/login");
    } catch (error) {
      next(error);
    }
  }
  async userProfile(req, res, next) {
    try {
      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت اطلاعات با موفقیت انجام شد",
        data: req.userAuth,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateUser(req, res, next) {
    try {
      const data = copyObject(req.body);
      const blackListFields = ["role"];
      deleteInvalidPropertyInObject(data, blackListFields);

      const { password } = data;
      let profileUpdateResult = null;

      if (password) {
        const hashedPassword = await hashPassword(password);
        profileUpdateResult = await userModel.updateOne({ _id: req.userAuth._id }, { $set: { ...data, password: hashedPassword } });
      } else {
        profileUpdateResult = await userModel.updateOne({ _id: req.userAuth._id }, { $set: data });
      }
      if (!profileUpdateResult.modifiedCount) throw new createError.InternalServerError("به روزسانی انجام نشد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "ویرایش کاربر با موفقیت انجام شد",
        data: req.userAuth,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
