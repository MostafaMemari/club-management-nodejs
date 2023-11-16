const asyncHandler = require("express-async-handler");
const { studentRegisterSchema } = require("../../validations/authSchema");
const {
  copyObject,
  deleteInvalidPropertyInObject,
  normalizePhoneNumber,
  normalizeCalendar,
  assignAgeGroupsByBirthDay,
} = require("../../helpers/function");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { studentModel } = require("../../models/staff/studentModel");
const { clubModel } = require("../../models/club/clubModel");
const { beltModel } = require("../../models/club/beltModel");

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

  // const ageGroups =
  // console.log(ageGroups);

  // validate
  await studentRegisterSchema.validateAsync(data);

  //validate firstName And lastName
  const { firstName, lastName, nationalID, clubID, beltID } = data;

  if (!firstName) throw createError.BadRequest("نام وارد شده معتبر نمی باشد");
  if (!lastName) throw createError.BadRequest("نام خانوادگی وارد شده معتبر نمی باشد");

  // find student By nationalID
  if (nationalID) {
    const studentFound = await studentModel.findOne({ nationalID });
    if (studentFound) throw createError.Conflict("کد ولی وارد شده تکراری است");
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

  const created = await studentModel.create(data);

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "هنرجو با موفقیت ثبت شد",
    data,
  });
});
