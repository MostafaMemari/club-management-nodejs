const { StatusCodes } = require("http-status-codes");
const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const createError = require("http-errors");
const { ageGroupModel } = require("../../models/club/ageGroupModel");
const { ageGroupSchema } = require("../../validations/clubSchema");

//@desc Create age group
//@route POST /api/v1/ages
//@acess  Private Admin Only
module.exports.createAgeGourp = AsyncHandler(async (req, res) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  // validate
  await ageGroupSchema.validateAsync(data);

  const { name } = data;

  // find sport
  const ageGroupFound = await ageGroupModel.findOne({ name });
  if (ageGroupFound) throw createError.Conflict("رده سنی وارد شده تکراری می باشد");

  // create
  const ageGroupCreated = new ageGroupModel(data);
  await ageGroupCreated.save();
  if (!ageGroupCreated) throw createError.InternalServerError("ثبت رده سنی جدید با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "رشته ورزشی مورد نظر با موفقیت ثبت شد",
    ageGroupCreated,
  });
});
