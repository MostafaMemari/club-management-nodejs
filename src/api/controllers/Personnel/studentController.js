const AsyncHandler = require("express-async-handler");
const { studentAndCoachSchema } = require("../../validations/authSchema");
const { copyObject, deleteInvalidPropertyInObject, deleteFileInPublic, toEnglish, dateNowIR } = require("../../helpers/function");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { studentModel } = require("../../models/Personnel/studentModel");

const { isValidObjectId } = require("mongoose");
const path = require("path");
const { normalizeDataDates, normalizePhoneNumber, normalizeCalendar } = require("../../helpers/normalizeData");
const { validate_nationalId_clubId_coachId_beltId } = require("../../helpers/validateFoundDB");
const { generateToken } = require("../../services/tokenServices");
const { beltModel } = require("../../models/BaseData/beltModel");

//@desc Register Student
//@route POST /api/v1/students/register
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
    let { birthDayIR, registerDateIR, sportsInsuranceIR, mobile } = data;
    normalizeDataDates(data, birthDayIR, registerDateIR, sportsInsuranceIR);
    mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

    const blackListFields = [
      "ageGroupID",
      "createdBy",
      "fileUploadPath",
      "filename",
      "beltDateIR",
      "birthDayEN",
      "registerDateEN",
      "sportsInsuranceEN",
      "beltDateEN",
      "coachID",
    ];
    deleteInvalidPropertyInObject(data, blackListFields);

    // validate
    await studentAndCoachSchema.validateAsync(data);

    //validate firstName And lastName
    const { firstName, lastName, nationalID, clubID, beltID, coachID } = data;

    if (!firstName) throw createError.BadRequest("نام وارد شده معتبر نمی باشد");
    if (!lastName) throw createError.BadRequest("نام خانوادگی وارد شده معتبر نمی باشد");

    //validate clubID , coachID and nationalID
    await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, coachID, "");

    //find belt
    if (beltID) {
      const beltFound = await beltModel.findById(beltID);
      if (!beltFound) throw createError.NotFound("کمربند مورد نظر یافت نشد");
      if (beltFound.name !== "سفید") {
        delete data.beltID;
        delete data.beltDateIR;
      } else {
        data.beltDateIR = toEnglish(normalizeCalendar(new Date().toLocaleDateString("fa-IR")));
      }
    }

    // create
    // const studentCreated = await studentModel.create({
    //   ...data,
    //   createdBy: req.userAuth._id,
    //   modelCreatedBy: req.userAuth.role == "COACH" ? "coach" : "user",
    // });
    // if (!studentCreated) throw createError.InternalServerError("ثبت نام با خطا مواجه شد");

    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "ثبت نام هنرجو با موفقیت انجام شد",
      data,
      // data: studentCreated,
    });
  } catch (error) {
    deleteFileInPublic(req.body.imageUrl);
    next(error);
  }
};

//@desc Login Student
//@route POST /api/v1/students/login
//@acess
exports.loginStudent = AsyncHandler(async (req, res) => {
  const data = copyObject(req.body);

  const { username, password } = data;

  // check student found
  if (!username) throw createError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

  const studentFound = await studentModel.findOne({ nationalID: username });
  if (!studentFound) throw createError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

  // check valid password
  const isValidPassword = password === "123456";
  if (!isValidPassword) throw createError.Unauthorized("نام کاربری یا رمز عبور اشتباه می باشد");

  const token = generateToken({ id: studentFound._id });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "با موفقیت وارد سیستم شدید",
    data: {
      token,
    },
  });
});

//@desc Update Student
//@route PUT /api/v1/students/:id
//@acess
exports.updateStudent = async (req, res, next) => {
  try {
    const studentFound = await checkExistStudent(req.params.id);

    const data = copyObject(req.body);

    // normalize Data
    let { birthDayIR, registerDateIR, sportsInsuranceIR, mobile } = data;
    normalizeDataDates(data, birthDayIR, registerDateIR, sportsInsuranceIR);
    mobile ? (data.mobile = normalizePhoneNumber(mobile)) : false;

    const blackListFields = [
      "beltID",
      "ageGroupID",
      "createdBy",
      "fileUploadPath",
      "filename",
      "beltDateIR",
      "birthDayEN",
      "registerDateEN",
      "sportsInsuranceEN",
      "beltDateEN",
      "coachID",
    ];

    deleteInvalidPropertyInObject(data, blackListFields);

    // validate
    await studentAndCoachSchema.validateAsync(data);

    //validate clubID , coachID and nationalID
    const { nationalID, clubID, coachID } = data;
    await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, coachID, "");

    // update
    const studentCreated = await studentModel.updateOne({ _id: req.params.id }, data, {
      new: true,
    });
    if (!studentCreated.modifiedCount) throw createError.InternalServerError("بروزرسانی اطلاعات با خطا مواجه شد");

    if (data.imageUrl) deleteFileInPublic(studentFound.imageUrl);

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "بروزرسانی اطلاعات با موفقیت انجام شد",
    });
  } catch (error) {
    deleteFileInPublic(req.body.imageUrl);
    next(error);
  }
};

//@desc Get All Students
//@route GET /api/v1/students
//@acess
exports.getStudents = AsyncHandler(async (req, res) => {
  // res.status(200).json(res.result);
  const students = await studentModel
    .find({})
    .populate("clubID", "name")
    .populate("beltID", "name")
    .populate("ageGroupID", "name description")
    .populate("coachID", "firstName lastName");
  if (!students) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: students,
  });
});

//@desc Get Single Student
//@route GET /api/v1/students/:id
//@acess
exports.getStudent = AsyncHandler(async (req, res) => {
  const students = await checkExistStudent(req.params.id);

  if (!students) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: students,
  });
});

//@desc Profile Student
//@route GET /api/v1/students/profile
//@acess
exports.profileStudent = AsyncHandler(async (req, res) => {
  const studentID = req.userAuth._id;

  const profileStudent = await studentModel
    .findById(studentID)
    .populate("clubID", "name")
    .populate("beltID", "name")
    .populate("ageGroupID", "name description")
    .populate("coachID", "firstName lastName");

  if (!profileStudent) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: profileStudent ? profileStudent : {},
  });
});

//@desc Delete Student
//@route DELETE /api/v1/students/:id
//@acess
exports.deleteStudent = AsyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  const deletedStudent = await studentModel.deleteOne({ _id: req.params.id });
  if (!deletedStudent.deletedCount) throw createError.InternalServerError("حذف هنرجو با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "حذف هنرجو با موفقیت انجام شد",
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
    .populate("coachID", "firstName lastName")
    .populate("createdBy", "-password");

  console.log(studentFound);
  if (!studentFound) throw createError.NotFound("دریافت اطلاعات با خطا مواجه شد");
  return studentFound;
};
