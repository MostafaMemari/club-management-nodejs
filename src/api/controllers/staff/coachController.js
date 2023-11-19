const AsyncHandler = require("express-async-handler");
const {
  copyObject,
  deleteInvalidPropertyInObject,
  normalizeCalendar,
  normalizePhoneNumber,
  deleteFileInPublic,
} = require("../../helpers/function");
const { studentAndCoachRegisterSchema } = require("../../validations/authSchema");
const { coachModel } = require("../../models/staff/coachModel");
const { clubModel } = require("../../models/club/clubModel");
const { beltModel } = require("../../models/club/beltModel");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const path = require("path");

//@desc Register Coach
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
    let { birthDayIR, mobile, registerDateIR } = data;
    birthDayIR ? (data.birthDayIR = normalizeCalendar(birthDayIR)) : false;
    registerDateIR ? (data.registerDateIR = normalizeCalendar(registerDateIR)) : false;
    mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

    const blackListFields = ["phone", "ageGroupID", "coachID", "birthDayEN", "registerDateEN", "createdBy"];
    deleteInvalidPropertyInObject(data, blackListFields);

    // validate firstName And lastName
    const { firstName, lastName, nationalID, clubID, beltID } = data;
    console.log(data);

    if (!firstName) throw createError.BadRequest("نام وارد شده معتبر نمی باشد");
    if (!lastName) throw createError.BadRequest("نام خانوادگی وارد شده معتبر نمی باشد");
    if (!nationalID) throw createError.BadRequest("کد ملی وارد شده معتبر نمی باشد");

    // validate
    await studentAndCoachRegisterSchema.validateAsync(data);

    // find coach By nationalID
    if (nationalID) {
      const coachFound = await coachModel.findOne({ nationalID });
      if (coachFound) throw createError.Conflict("کد ملی وارد شده تکراری است");
    }
    // find club
    if (clubID) {
      const clubFound = await clubModel.findById(clubID);
      if (!clubFound) throw createError.NotFound("باشگاه مورد نظر یافت نشد");
    }
    //find belt
    if (beltID) {
      const beltFound = await beltModel.findById(beltID);
      if (!beltFound) throw createError.NotFound("کمربند مورد نظر یافت نشد");
    }

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
