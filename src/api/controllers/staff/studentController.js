const asyncHandler = require("express-async-handler");
const { studentAndCoachRegisterSchema } = require("../../validations/authSchema");
const {
  copyObject,
  deleteInvalidPropertyInObject,
  normalizePhoneNumber,
  normalizeCalendar,
  normalizeImageUrl,
  deleteFileInPublic,
} = require("../../helpers/function");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { studentModel } = require("../../models/staff/studentModel");
const { clubModel } = require("../../models/club/clubModel");
const { beltModel } = require("../../models/club/beltModel");
const { coachModel } = require("../../models/staff/coachModel");
const { isValidObjectId } = require("mongoose");
const path = require("path");

//@desc Register Student
//@route POST /api/v1/students
//@acess
exports.registerStudent = async (req, res, next) => {
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
    birthDayIR ? (data.birthDayIR = normalizeCalendar(birthDayIR)) : false;
    registerDateIR ? (data.registerDateIR = normalizeCalendar(registerDateIR)) : false;
    mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

    const blackListFields = ["ageGroupID", "createdBy", "birthDayEN", "fileUploadPath", "filename"];
    deleteInvalidPropertyInObject(data, blackListFields);
    console.log(data);

    // validate
    await studentAndCoachRegisterSchema.validateAsync(data);

    //validate firstName And lastName
    const { firstName, lastName, nationalID, clubID, beltID, coachID } = data;

    if (!firstName) throw createError.BadRequest("نام وارد شده معتبر نمی باشد");
    if (!lastName) throw createError.BadRequest("نام خانوادگی وارد شده معتبر نمی باشد");

    // find student By nationalID
    if (nationalID) {
      const studentFound = await studentModel.findOne({ nationalID });
      if (studentFound) throw createError.Conflict("کد ملی وارد شده تکراری است");
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
    //find coach
    if (coachID) {
      const coachFound = await coachModel.findById(coachID);
      if (!coachFound) throw createError.NotFound("مربی مورد نظر یافت نشد");
    }

    // create
    const studentCreated = await studentModel.create(data);
    if (!studentCreated) throw createError.InternalServerError("ثبت نام با خطا مواجه شد");

    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "ثبت نام هنرجو با موفقیت انجام شد",
      data: studentCreated,
    });
  } catch (error) {
    deleteFileInPublic(req.body.imageUrl);
    next(error);
  }
};

//@desc Update Student
//@route PUT /api/v1/students/:id
//@acess
exports.updateStudent = asyncHandler(async (req, res) => {
  await checkExistStudent(req.params.id);

  const data = copyObject(req.body);

  // normalize Data
  let { birthDayIR, registerDateIR, mobile } = data;
  birthDayIR ? (data.birthDayIR = normalizeCalendar(birthDayIR)) : false;
  registerDateIR ? (data.registerDateIR = normalizeCalendar(registerDateIR)) : false;
  mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

  const blackListFields = ["ageGroupID", "createdBy", "birthDayEN", "registerDateEN", "beltID"];
  deleteInvalidPropertyInObject(data, blackListFields);

  // validatek
  await studentAndCoachRegisterSchema.validateAsync(data);

  //validate firstName And lastName
  const { nationalID, clubID, coachID } = data;

  // find student By nationalID
  if (nationalID) {
    const studentFound = await studentModel.findOne({ nationalID });
    if (studentFound) throw createError.Conflict("کد ملی وارد شده تکراری است");
  }
  // find club
  if (clubID) {
    const clubFound = await clubModel.findById(clubID);
    if (!clubFound) throw createError.NotFound("باشگاه مورد نظر یافت نشد");
  }
  //find coach
  if (coachID) {
    const coachFound = await coachModel.findById(coachID);
    if (!coachFound) throw createError.NotFound("مربی مورد نظر یافت نشد");
  }

  // update
  const studentCreated = await studentModel.updateOne({ _id: req.params.id }, data, {
    new: true,
  });
  if (!studentCreated.modifiedCount) throw createError.InternalServerError("بروزرسانی اطلاعات با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "بروزرسانی اطلاعات با موفقیت انجام شد",
  });
});

//@desc Get All Students
//@route GET /api/v1/students
//@acess
exports.getStudents = asyncHandler(async (req, res) => {
  const students = await studentModel
    .find({})
    .populate("clubID", "name")
    .populate("beltID", "name")
    .populate("ageGroupID", "name description")
    .populate("coachID", "firstName lastName");

  if (!students) throw createError.InternalServerError("دریافت هنرجویان با خطا مواجه شد");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: students,
  });
});

//@desc Get Single Student
//@route GET /api/v1/students/:id
//@acess
exports.getStudent = asyncHandler(async (req, res) => {
  const students = await checkExistStudent(req.params.id);

  if (!students) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: students,
  });
});

const checkExistStudent = async (id) => {
  if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  // find student
  const studentFound = await studentModel
    .findById(id)
    .populate("clubID", "name")
    .populate("beltID", "name")
    .populate("ageGroupID", "name description")
    .populate("coachID", "firstName lastName");
  if (!studentFound) throw createError.NotFound("دریافت اطلاعات با خطا مواجه شد");
  return studentFound;
};
