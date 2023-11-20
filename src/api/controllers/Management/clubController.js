const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const { clubModel } = require("../../models/Management/clubModel");
const { isValidObjectId } = require("mongoose");
const { clubSchema, clubSchemaUpdate } = require("../../validations/clubSchema");
const { sportModel } = require("../../models/Admin/baseData/sportModel");
const { studentModel } = require("../../models/Management/studentModel");

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

//@desc Update Club
//@route POST /api/v1/clubs/:id
//@acess  Private Admin Only
module.exports.updateClub = AsyncHandler(async (req, res) => {
  await checkExistClub(req.params.id);

  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data, ["sportID"]);

  // validate
  await clubSchemaUpdate.validateAsync(data);

  const { name } = data;

  // find club
  const clubFound = await clubModel.findOne({ name });
  if (clubFound) throw createError.Conflict("نام باشگاه تکراری است");

  // update
  const clubUpdated = await clubModel.updateOne({ _id: req.params.id }, data);
  if (!clubUpdated.modifiedCount) throw createError.InternalServerError("بروزرسانی باشگاه با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "بروزرسانی باشگاه با موفقیت انجام شد",
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
//@route GET /api/v1/clubs/:id
//@acess  Private Admin Only
module.exports.getClub = AsyncHandler(async (req, res) => {
  const clubFound = await checkExistClub(req.params.id);

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: clubFound,
  });
});

//@desc Delete Club
//@route DELETE /api/v1/clubs/:id
//@acess  Private Admin Only
module.exports.deleteClub = AsyncHandler(async (req, res) => {
  await checkExistClub(req.params.id);

  const deletedClub = await clubModel.deleteOne({ _id: req.params.id });
  if (!deletedClub.deletedCount) throw createError.InternalServerError("حذف باشگاه با خطا مواجه شد");

  await studentModel.updateMany({ clubID: req.params.id }, { $unset: { clubID: 1 } });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "حذف باشگاه با موفقیت انجام شد",
  });
});

//@desc Add Sport to Club
//@route PATCH /api/v1/clubs/:id/sport/add
//@acess  Private Admin Only
module.exports.addSportToClub = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  console.log(req.body);
  const blackListFields = ["name", "gender", "address", "phone"];
  deleteInvalidPropertyInObject(data, blackListFields);

  // validate
  await checkExistClub(req.params.id);

  const { sportID } = data;
  // find Sport
  for (const i in sportID) {
    if (typeof sportID == "string") {
      if (!isValidObjectId(sportID)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");
      const sportFound = await sportModel.findById(sportID);
      if (!sportFound) throw createError.NotFound("رشته ورزشی وارد شده معتبر نمی باشد");
    } else {
      if (!isValidObjectId(sportID[i])) throw createError.BadRequest("شناسه رشته ورزشی وارد شده معتبر نمی باشد");
      const sportFound = await sportModel.findById(sportID[i]);
      if (!sportFound) sportID.splice(i, 1);
    }
  }

  // update
  const clubUpdated = await clubModel.updateOne({ _id: req.params.id }, { $addToSet: { sportID } });
  if (!clubUpdated.modifiedCount) throw createError.InternalServerError("ایجاد رشته ورزشی با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "رشته ورزشی مورد نظر با موفقیت به باشگاه اضافه شد",
  });
});

//@desc Remove Sport to Club
//@route PATCH /api/v1/clubs/:id/sport/:sportID/remove
//@acess  Private Admin Only
module.exports.removeSportToClub = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  const blackListFields = ["name", "gender", "address", "phone"];
  deleteInvalidPropertyInObject(data, blackListFields);

  const { id: clubID, sportID } = req.params;

  // validate
  if (!isValidObjectId(sportID)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  // find club
  const clubFound = await checkExistClub(clubID);

  // find sport
  if (sportID) {
    const sportFound = await sportModel.findById(sportID).lean();
    if (!sportFound) throw createError.NotFound("شناسه رشته ورزشی معتبر نمی باشد");
  }

  // check Sport in Club
  if (!clubFound.sportID.includes(sportID)) throw createError.NotFound("رشته ورزشی وارد شده یافت نشد");

  // remove Sport
  clubFound.sportID.pull(sportID);
  clubFound.save();

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "رشته ورزشی مورد نظر با موفقیت از باشگاه حذف شد",
  });
});

const checkExistClub = async (id) => {
  if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  // find age group
  const clubFound = await clubModel.findById(id);
  if (!clubFound) throw createError.NotFound("باشگاه وارد شده یافت نشد");
  return clubFound;
};
