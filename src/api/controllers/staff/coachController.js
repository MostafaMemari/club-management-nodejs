const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject, deleteFileInPublic } = require("../../helpers/function");
const { studentAndCoachSchema } = require("../../validations/authSchema");
const { coachModel } = require("../../models/staff/coachModel");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const path = require("path");
const { isValidObjectId } = require("mongoose");
const { validate_nationalId_clubId_coachId_beltId } = require("../../helpers/validateFoundDB");
const { normalizeDataDates, normalizePhoneNumber } = require("../../helpers/normalizeData");

//@desc Register Coach By Admin
//@route POST /api/v1/coachs/admin/register
//@acess Private Admin Only
exports.registerCoach = async (req, res, next) => {
  try {
    const { fileUploadPath, filename } = req.body;
    if (fileUploadPath && filename) {
      const urlPath = path.join(fileUploadPath, filename);
      req.body.imageUrl = urlPath.replace(/\\/g, "/");

      delete req.body["fileUploadPath"];
      delete req.body["filename"];
    }
    const data = copyObject(req.body);

    // normalize Data
    let { birthDayIR, registerDateIR, mobile } = data;
    normalizeDataDates(data, birthDayIR, registerDateIR);
    mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

    const blackListFields = ["phone", "ageGroupID", "coachID", "birthDayEN", "registerDateEN", "createdBy"];
    deleteInvalidPropertyInObject(data, blackListFields);

    // validate firstName And lastName
    const { firstName, lastName, nationalID, clubID, beltID } = data;

    if (!firstName) throw createError.BadRequest("نام وارد شده معتبر نمی باشد");
    if (!lastName) throw createError.BadRequest("نام خانوادگی وارد شده معتبر نمی باشد");
    if (!nationalID) throw createError.BadRequest("کد ملی وارد شده معتبر نمی باشد");

    // validate
    await studentAndCoachSchema.validateAsync(data);

    await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, "", beltID);
    //create
    const coachCreated = await coachModel.create(data);
    if (!coachCreated) throw createError.InternalServerError("ثبت نام مربی با خطا مواجه شد");

    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "ثبت مربی با موفقیت انجام شد ",
      data: coachCreated,
    });
  } catch (error) {
    deleteFileInPublic(req.body.imageUrl);
    next(error);
  }
};

//@desc Update Coach By Admin
//@route PUT /api/v1/coachs/:id/admin
//@acess Private Admin Only
exports.updateCoach = async (req, res, next) => {
  try {
    const coachFound = await checkExistCoach(req.params.id);

    const { fileUploadPath, filename } = req.body;
    if (fileUploadPath && filename) {
      const urlPath = path.join(fileUploadPath, filename);
      req.body.imageUrl = urlPath.replace(/\\/g, "/");

      delete req.body["fileUploadPath"];
      delete req.body["filename"];
    }

    const data = copyObject(req.body);

    // normalize Data
    let { birthDayIR, registerDateIR, mobile } = data;
    normalizeDataDates(data, birthDayIR, registerDateIR);
    mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

    const blackListFields = ["phone", "ageGroupID", "coachID", "birthDayEN", "registerDateEN", "createdBy"];
    deleteInvalidPropertyInObject(data, blackListFields);

    // validate firstName And lastName
    const { nationalID, clubID, beltID } = data;
    await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, "", beltID);

    // validate
    await studentAndCoachSchema.validateAsync(data);

    // updated
    const coachUpdated = await coachModel.updateOne({ _id: req.params.id }, data);
    if (!coachUpdated.modifiedCount) throw createError.InternalServerError("بروزرسانی اطلاعات با خطا مواجه شد");

    if (data.imageUrl) deleteFileInPublic(coachFound.imageUrl);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "بروزرسانی اطلاعات با موفقیت انجام شد",
    });
  } catch (error) {
    deleteFileInPublic(req.body.imageUrl);
    next(error);
  }
};

//@desc Get Single Coach
//@route GET /api/v1/coachs/:id/admin
//@acess Private Admin Only
exports.getCoach = AsyncHandler(async (req, res) => {
  const coach = await checkExistCoach(req.params.id);

  if (!coach) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: coach,
  });
});

//@desc Get All Coachs
//@route GET /api/v1/coachs
//@acess Private Admin Only
exports.getCoachs = AsyncHandler(async (req, res) => {
  const coachs = await coachModel
    .find({})
    .lean()
    .populate({
      path: "clubID",
      populate: {
        path: "sportID",
      },
    })
    .populate("beltID")
    .select("-createdAt -updatedAt -registerDateEN -birthDayEN");

  if (!coachs) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: coachs,
  });
});

//@desc Delete Coach
//@route DELETE /api/v1/coachs/:id/admin
//@acess Private Admin Only
exports.deleteCoach = AsyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  const deletedCoach = await coachModel.deleteOne({ _id: req.params.id });
  if (!deletedCoach.deletedCount) throw createError.InternalServerError("حذف مربی با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "حذف مربی با موفقیت انجام شد",
  });
});

const checkExistCoach = async (id) => {
  if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  // find Coachs
  const coachFound = await coachModel
    .findById(id)
    .lean()
    .populate({
      path: "clubID",
      populate: {
        path: "sportID",
      },
    })
    .populate("beltID")
    .select("-createdAt -updatedAt -registerDateEN -birthDayEN");
  if (!coachFound) throw createError.NotFound("مربی مورد نظر یافت نشد");
  return coachFound;
};
