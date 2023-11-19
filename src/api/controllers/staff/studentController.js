const AsyncHandler = require("express-async-handler");
const { studentAndCoachRegisterSchema } = require("../../validations/authSchema");
const { copyObject, deleteInvalidPropertyInObject, deleteFileInPublic } = require("../../helpers/function");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { studentModel } = require("../../models/staff/studentModel");

const { isValidObjectId } = require("mongoose");
const path = require("path");
const { normalize_birthDayIR_registerDateIR_mobile } = require("../../helpers/normalizeData");
const { validate_nationalId_clubId_coachId_beltId } = require("../../helpers/validateFoundDB");

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
    normalize_birthDayIR_registerDateIR_mobile(data, birthDayIR, registerDateIR, mobile);

    const blackListFields = ["ageGroupID", "createdBy", "birthDayEN", "fileUploadPath", "filename"];
    deleteInvalidPropertyInObject(data, blackListFields);

    // validate
    await studentAndCoachRegisterSchema.validateAsync(data);

    //validate firstName And lastName
    const { firstName, lastName, nationalID, clubID, beltID, coachID } = data;

    if (!firstName) throw createError.BadRequest("نام وارد شده معتبر نمی باشد");
    if (!lastName) throw createError.BadRequest("نام خانوادگی وارد شده معتبر نمی باشد");

    //validate clubID , coachID and nationalID
    await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, coachID, beltID);

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
exports.updateStudent = async (req, res, next) => {
  try {
    const studentFound = await checkExistStudent(req.params.id);

    const data = copyObject(req.body);

    // normalize Data
    let { birthDayIR, registerDateIR, mobile } = data;
    normalize_birthDayIR_registerDateIR_mobile(data, birthDayIR, registerDateIR, mobile);

    const blackListFields = ["ageGroupID", "createdBy", "birthDayEN", "registerDateEN", "beltID"];
    deleteInvalidPropertyInObject(data, blackListFields);

    // validate
    await studentAndCoachRegisterSchema.validateAsync(data);

    //validate clubID , coachID and nationalID
    const { nationalID, clubID, coachID } = data;
    await validate_nationalId_clubId_coachId_beltId(nationalID, clubID, coachID);

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
    .populate("coachID", "firstName lastName");
  if (!studentFound) throw createError.NotFound("دریافت اطلاعات با خطا مواجه شد");
  return studentFound;
};
