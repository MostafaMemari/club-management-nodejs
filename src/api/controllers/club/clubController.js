const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { clubSchema } = require("../../validations/clubSchema");
const { StatusCodes } = require("http-status-codes");
const { sportModel } = require("../../models/club/sportModel");
const createError = require("http-errors");
const { clubModel } = require("../../models/club/clubModel");

//@desc Create Club
//@route POST /api/v1/clubs
//@acess  Private Admin Only
module.exports.createClub = AsyncHandler(async (req, res) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  // validate
  await clubSchema.validateAsync(data);

  const { sportID, name } = data;

  // find club
  const clubFound = await clubModel.findOne({ name });
  if (clubFound) throw createError.Conflict("نام باشگاه تکراری است");

  // find sport
  const sportFound = await sportModel.findById(sportID);
  if (!sportFound) throw createError.NotFound("رشته ورزشی مورد نظر یافت نشد");

  // create
  const clubCreated = new clubModel(data);
  await clubCreated.save();
  if (!clubCreated) throw createError.InternalServerError("ثبت باشگاه جدید با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "باشگاه با موفقیت ثبت شد",
    data,
  });
});
