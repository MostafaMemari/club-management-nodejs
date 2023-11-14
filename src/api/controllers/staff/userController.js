const asyncHandler = require("express-async-handler");

const { userModel } = require("../../models/staff/userModel");

const { userSchema } = require("../../validations/authSchema");
const { hashPassword, copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");

module.exports.registerUser = asyncHandler(async (req, res) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  await userSchema.validateAsync(data);
  const { username, password, email } = data;

  // check user found
  const userFound = await userModel.findOne({ $or: [{ username }, { email }] });
  if (userFound) throw createError.Conflict("کاربر با این مشخصات قبلاً ثبت شده است");

  // hash password
  const hashedPassword = await hashPassword(password);

  // create new user
  const userCreated = await userModel.create({ username, password: hashedPassword, email });

  if (!userCreated) throw createError.InternalServerError("ثبت نام ادمین با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "ثبت نام یوزر با موفقیت انجام شد",
    data: {
      userCreated,
    },
  });
});
