const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { beltExamModel } = require("../../models/club/beltExamModel");
const { beltExamSchema, beltExamUpdateSchema } = require("../../validations/clubSchema");
const { beltModel } = require("../../models/club/beltModel");
const { StatusCodes } = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const createError = require("http-errors");

//@desc Create Belt Exam
//@route POST /api/v1/belt-exams
//@acess  Private Admin Only
module.exports.createBeltExam = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  // validate
  await beltExamSchema.validateAsync(data);

  const { beltID, gender, name } = data;

  // find Belt Exam
  const beltExamFound = await beltExamModel.findOne({ name, gender });
  if (beltExamFound) throw createError.Conflict("آزمون کمربند وارد شده تکراری می باشد");

  // find Belt
  for (const i in beltID) {
    if (!isValidObjectId(beltID[i])) throw createError.BadRequest("شناسه کمربند وارد شده معتبر نمی باشد");
    const beltFound = await beltModel.findById(beltID[i]);
    if (!beltFound) throw createError.NotFound("کمربند های وارد شده معتبر نمی باشد");
  }

  // create
  const beltExamCreated = new beltExamModel(data);
  await beltExamCreated.save();
  if (!beltExamCreated) throw createError.InternalServerError("ثبت آزمون با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "ثبت آزمون با موفقیت انجام شد",
    beltExamCreated,
  });
});

//@desc Update Belt Exam
//@route PUT /api/v1/belt-exams/:id
//@acess  Private Admin Only
module.exports.updateBeltExam = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  const blackListFields = ["beltID", "eventDateEN", "registerDateEN"];
  deleteInvalidPropertyInObject(data, blackListFields);

  // validate
  await beltExamUpdateSchema.validateAsync({ ...data, id: req.params.id });

  let { gender, name } = data;

  // find Belt Exam
  const beltExamExist = await checkExistBeltExam(req.params.id);
  if (gender || name) {
    gender = gender ? gender : beltExamExist.gender;
    name = name ? name : beltExamExist.name;

    const beltExamFound = await beltExamModel.findOne({ gender, name });
    if (beltExamFound) {
      delete data["name"];
      delete data["gender"];
    }
  }

  // update
  const beltExamUpdated = await beltExamModel.updateOne({ _id: req.params.id }, data);
  if (!beltExamUpdated.modifiedCount) throw createError.InternalServerError("ویرایش آزمون با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "آزمون مورد نظر با موفقیت ویرایش شد",
  });
});

//@desc Remove Belt Exam
//@route DELETE /api/v1/belt-exams/:id
//@acess  Private Admin Only
module.exports.removeBeltExam = AsyncHandler(async (req, res, next) => {
  // validate
  if (!isValidObjectId(req.params.id)) throw createError.BadRequest("شناسه آزمون کمربند معتبر نمی باشد");
  await checkExistBeltExam(req.params.id);

  // update
  const beltExamRemoved = await beltExamModel.deleteOne({ _id: req.params.id });
  if (!beltExamRemoved.deletedCount) throw createError.InternalServerError("حذف آزمون با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "آزمون مورد نظر با موفقیت حذف شد",
  });
});

//@desc Get All Belt Exams
//@route GET /api/v1/belt-exams/
//@acess  Public
module.exports.getBeltExams = AsyncHandler(async (req, res, next) => {
  const beltExamFound = await beltExamModel.find({}).populate("beltID", "name").lean();
  if (!beltExamFound) throw createError.InternalServerError("دریافت آزمون ها با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت آزمون های کمربند با موفقیت انجام شد ",
    beltExamFound,
  });
});

//@desc Add Belt to beltExam
//@route PATCH /api/v1/belt-exams/:id/belt/add
//@acess  Private Admin Only
module.exports.addBeltToBeltExam = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  const blackListFields = ["name", "description", "eventPlace", "gender", "eventDateIR", "registerDateIR", "eventDateEN", "registerDateEN"];
  deleteInvalidPropertyInObject(data, blackListFields);

  // validate
  if (!isValidObjectId(req.params.id)) throw createError.BadRequest("شناسه آزمون کمربند معتبر نمی باشد");
  await checkExistBeltExam(req.params.id);

  const { beltID } = data;
  // find Belt
  for (const i in beltID) {
    if (typeof beltID == "string") {
      if (!isValidObjectId(beltID)) throw createError.BadRequest("شناسه کمربند وارد شده معتبر نمی باشد");
      const beltFound = await beltModel.findById(beltID);
      if (!beltFound) throw createError.NotFound("کمربند وارد شده معتبر نمی باشد");
    } else {
      if (!isValidObjectId(beltID[i])) throw createError.BadRequest("شناسه کمربند وارد شده معتبر نمی باشد");
      const beltFound = await beltModel.findById(beltID[i]);
      if (!beltFound) beltID.splice(i, 1);
    }
  }

  // update
  const beltExamUpdated = await beltExamModel.updateOne({ _id: req.params.id }, { $addToSet: { beltID } });
  if (!beltExamUpdated.modifiedCount) throw createError.InternalServerError("ایجاد کمربند با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "کمربند مورد نظر با موفقیت به آزمون اضافه شد",
    // beltExamUpdated,
  });
});

//@desc Remove Belt to beltExam
//@route PATCH /api/v1/belt-exams/:id/belt/:beltID/remove
//@acess  Private Admin Only
module.exports.removeBeltToBeltExam = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  const blackListFields = ["name", "description", "eventPlace", "gender", "eventDateIR", "registerDateIR", "eventDateEN", "registerDateEN"];
  deleteInvalidPropertyInObject(data, blackListFields);

  const { id: examID, beltID } = req.params;

  // validate
  if (!isValidObjectId(examID)) throw createError.BadRequest("شناسه آزمون کمربند معتبر نمی باشد");
  if (!isValidObjectId(beltID)) throw createError.BadRequest("شناسه کمربند معتبر نمی باشد");

  // find belt exam
  const beltExamFound = await checkExistBeltExam(examID);

  // find belt
  if (beltID) {
    const beltFound = await beltModel.findById(beltID).lean();
    if (!beltFound) throw createError.NotFound("شناسه کمربند معتبر نمی باشد");
  }

  // check belt in beltExam
  if (!beltExamFound.beltID.includes(beltID)) throw createError.NotFound("کمربند وارد شده یافت نشد");

  // remove belt
  beltExamFound.beltID.pull(beltID);
  beltExamFound.save();

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "کمربند مورد نظر با موفقیت از آزمون حذف شد",
  });
});

const checkExistBeltExam = async (id) => {
  // find Belt Exam
  const beltExamFound = await beltExamModel.findById(id);
  if (!beltExamFound) throw createError.NotFound("آزمون مورد نظر یافت نشد");
  return beltExamFound;
};
