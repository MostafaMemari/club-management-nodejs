const asyncHandler = require("express-async-handler");
const { studentAndCoachRegisterSchema } = require("../../validations/authSchema");
const { copyObject, deleteInvalidPropertyInObject, normalizePhoneNumber, normalizeCalendar } = require("../../helpers/function");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { studentModel } = require("../../models/staff/studentModel");
const { clubModel } = require("../../models/club/clubModel");
const { beltModel } = require("../../models/club/beltModel");
const { coachModel } = require("../../models/staff/coachModel");

//@desc Register Student
//@route POST /api/v1/students
//@acess
exports.registerStudent = asyncHandler(async (req, res) => {
  const data = copyObject(req.body);

  // normalize Data
  let { birthDayIR, registerDateIR, mobile } = data;
  birthDayIR ? (data.birthDayIR = normalizeCalendar(birthDayIR)) : false;
  registerDateIR ? (data.registerDateIR = normalizeCalendar(registerDateIR)) : false;
  mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

  deleteInvalidPropertyInObject(data);

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
  //find belt
  if (coachID) {
    const coachFound = await coachModel.findById(coachID);
    if (!coachFound) throw createError.NotFound("مربی مورد نظر یافت نشد");
  }

  //create
  const studentCreated = await studentModel.create(data);
  if (!studentCreated) throw createError.InternalServerError("ثبت نام شاگرد با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "هنرجو با موفقیت ثبت شد",
    data: studentCreated,
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
    message: "دریافت هنرجویان با موفقیت انجام شد",
    data: students,
  });
});
