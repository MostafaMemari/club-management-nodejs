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
  if (!beltExamUpdated.modifiedCount) throw createError.InternalServerError("ویرایش آزمون با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "آزمون مورد نظر با موفقیت ویرایش شد",
    // beltExamUpdated,
  });
});

const checkExistBeltExam = async (id) => {
  // find Belt Exam
  const beltExamFound = await beltExamModel.findById(id);
  if (!beltExamFound) throw createError.NotFound("دوره آزمون مورد نظر یافت نشد");
  return beltExamFound;
};
