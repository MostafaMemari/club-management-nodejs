const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { beltExamModel } = require("../../models/club/beltExamModel");
const { beltExamSchema } = require("../../validations/clubSchema");
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
