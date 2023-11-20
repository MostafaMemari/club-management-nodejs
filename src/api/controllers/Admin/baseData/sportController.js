const { StatusCodes } = require("http-status-codes");
const { sportSchema } = require("../../../validations/clubSchema");
const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../../helpers/function");
const { sportModel } = require("../../../models/Admin/baseData/sportModel");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");

//@desc Create Sport
//@route POST /api/v1/sports
//@acess  Private Admin Only
module.exports.createSport = AsyncHandler(async (req, res) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  // validate
  await sportSchema.validateAsync(data);

  const { name } = data;

  // find sport
  const sportFound = await sportModel.findOne({ name });
  if (sportFound) throw createError.Conflict("رشته ورزشی تکراری می باشد");

  // create
  const sportCreated = new sportModel(data);
  await sportCreated.save();
  if (!sportCreated) throw createError.InternalServerError("ثبت رشته ورزشی با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "رشته ورزشی مورد نظر با موفقیت ثبت شد",
    sportCreated,
  });
});

//@desc Get All Sports
//@route GET /api/v1/sports
//@acess  Private Admin Only
module.exports.getSports = AsyncHandler(async (req, res) => {
  const sportFound = await sportModel.find({}).lean();
  if (!sportFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: sportFound,
  });
});

//@desc Get Single Sport
//@route GET /api/v1/sports/:id
//@acess  Private Admin Only
module.exports.getSport = AsyncHandler(async (req, res) => {
  const sportFound = await checkExistSport(req.params.id);

  if (!sportFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: sportFound,
  });
});

const checkExistSport = async (id) => {
  if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  // find Sports
  const clubFound = await clubModel.findById(id).lean();
  if (!clubFound) throw createError.NotFound("ورزش مورد نظر یافت نشد");
  return clubFound;
};