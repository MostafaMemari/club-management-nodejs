const asyncHandler = require("express-async-handler");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");

const { userModel } = require("../../models/Personnel/userModel");
const { userRegisterSchema } = require("../../validations/authSchema");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { hashPassword, isPassMatched } = require("../../services/passwordServices");
const { generateToken } = require("../../services/tokenServices");

//@desc User Register
//@route POST /api/v1/users/register
//@acess  Public
module.exports.registerUser = asyncHandler(async (req, res) => {
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
});

//@desc User Login
//@route POST /api/v1/users/login
//@acess  Public
module.exports.loginUser = asyncHandler(async (req, res) => {
  const data = copyObject(req.body);

  const { identifier, password } = data;

  // check user found
  const userFound = await userModel.findOne({ $or: [{ username: identifier }, { email: identifier }] });
  if (!userFound) throw createError.Unauthorized("نام کاربری یا کلمه عبور وارد شده اشتباه است");

  // check valid password
  const isValidPassword = await isPassMatched(password, userFound.password);
  if (!isValidPassword) throw createError.Unauthorized("نام کاربری یا کلمه عبور وارد شده اشتباه است");

  const token = generateToken({ id: userFound._id });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "با موفقیت وارد سیستم شدید",
    data: {
      token,
    },
  });
});

//@desc Get Profile User
//@route POST /api/v1/users/profile
//@acess  Private only Users
module.exports.userProfile = asyncHandler(async (req, res) => {
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: req.userAuth,
  });
});

//@desc Update User
//@route PUT /api/v1/users/
//@acess  Private only Users
module.exports.updateUser = asyncHandler(async (req, res) => {
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
});
