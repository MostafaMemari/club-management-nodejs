const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject, deleteFileInPublic } = require("../../helpers/function");
const { studentAndCoachRegisterSchema } = require("../../validations/authSchema");
const { coachModel } = require("../../models/staff/coachModel");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");
const path = require("path");
const { isValidObjectId } = require("mongoose");
const { normalize_birthDayIR_registerDateIR_mobile } = require("../../helpers/normalizeData");
const { validate_nationalId_clubId_coachId_beltId } = require("../../helpers/validateFoundDB");

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
    let { birthDayIR, mobile, registerDateIR } = data;
    normalize_birthDayIR_registerDateIR_mobile(data, birthDayIR, registerDateIR, mobile);

    const blackListFields = ["phone", "ageGroupID", "coachID", "birthDayEN", "registerDateEN", "createdBy"];
    deleteInvalidPropertyInObject(data, blackListFields);

    // validate firstName And lastName
    const { firstName, lastName, nationalID, clubID, beltID } = data;

    if (!firstName) throw createError.BadRequest("نام وارد شده معتبر نمی باشد");
    if (!lastName) throw createError.BadRequest("نام خانوادگی وارد شده معتبر نمی باشد");
    if (!nationalID) throw createError.BadRequest("کد ملی وارد شده معتبر نمی باشد");

    // validate
    await studentAndCoachRegisterSchema.validateAsync(data);

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
//@route PUT /api/v1/coachs/:id/admin/update
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
    normalize_birthDayIR_registerDateIR_mobile(data, birthDayIR, registerDateIR, mobile);

    const blackListFields = ["phone", "ageGroupID", "coachID", "birthDayEN", "registerDateEN", "createdBy"];
    deleteInvalidPropertyInObject(data, blackListFields);

    // validate firstName And lastName
    const { nationalID, clubID, beltID } = data;
    await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, "", beltID);

    // validate
    await studentAndCoachRegisterSchema.validateAsync(data);

    // updated
    const coachUpdated = await coachModel.updateOne({ _id: req.params.id }, data);
    if (!coachUpdated.modifiedCount) throw createError.InternalServerError("ویرایش اطلاعات با خطا مواجه شد");

    if (data.imageUrl) deleteFileInPublic(coachFound.imageUrl);

    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "ویرایش اطلاعات با موفقیت انجام شد",
      // data
    });
  } catch (error) {
    deleteFileInPublic(req.body.imageUrl);
    next(error);
  }
};

const checkExistCoach = async (id) => {
  if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  // find Coachs
  const coachFound = await coachModel.findById(id).lean();
  if (!coachFound) throw createError.NotFound("مربی مورد نظر یافت نشد");
  return coachFound;
};
