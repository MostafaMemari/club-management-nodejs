const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { clubSchema } = require("../../validations/clubSchema");
const { StatusCodes } = require("http-status-codes");
const { sportModel } = require("../../models/club/sportModel");
const createError = require("http-errors");
const { clubModel } = require("../../models/club/clubModel");
const { isValidObjectId } = require("mongoose");

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

//@desc Get All club
//@route GET /api/v1/clubs
//@acess  Private Admin Only
module.exports.getClubs = AsyncHandler(async (req, res) => {
  const clubFound = await clubModel.find({}).populate("sportID").lean();
  if (!clubFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: clubFound,
  });
});

//@desc Get Single club
//@route GET /api/v1/club/:id
//@acess  Private Admin Only
module.exports.getClub = AsyncHandler(async (req, res) => {
  const clubFound = await checkExistClub(req.params.id);

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: clubFound,
  });
});

const checkExistClub = async (id) => {
  if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  // find age group
  const clubFound = await clubModel.findById(id);
  if (!clubFound) throw createError.NotFound("باشگاه وارد شده یافت نشد");
  return clubFound;
};
