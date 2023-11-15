const { StatusCodes } = require("http-status-codes");
const { sportSchema } = require("../../validations/clubSchema");
const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { sportModel } = require("../../models/club/sportModel");
const createError = require("http-errors");

//@desc Create Sport
//@route POST /api/v1/Sports
//@acess  Private Admin Only
module.exports.createSport = AsyncHandler(async (req, res) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  const { name } = data;
  const sportFound = await sportModel.findOne({ name });
  if (sportFound) throw createError.InternalServerError("رشته ورزشی مورد نظر قبلا ثبت شده است");

  await sportSchema.validateAsync(data);

  const sportCreated = new sportModel(data);
  await sportCreated.save();
  if (!sportCreated) throw createError.InternalServerError("ثبت رشته ورزشی با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "رشته ورزشی مورد نظر با موفقیت ثبت شد",
    sportCreated,
  });
});
