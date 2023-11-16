const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { beltSchema } = require("../../validations/clubSchema");
const { StatusCodes } = require("http-status-codes");
const { beltModel } = require("../../models/club/beltModel");
const createError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { studentModel } = require("../../models/staff/studentModel");

//@desc Create Belt
//@route POST /api/v1/belts
//@acess  Private Admin Only
module.exports.createBelt = AsyncHandler(async (req, res) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  // validate
  await beltSchema.validateAsync(data);

  const { name } = data;

  // find belt
  const beltFound = await beltModel.findOne({ name });
  if (beltFound) throw createError.Conflict("کمربند وارد شده تکراری می باشد");

  // create
  const beltCreated = new beltModel(data);
  await beltCreated.save();
  if (!beltCreated) throw createError.InternalServerError("ثبت رشته ورزشی با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "رشته ورزشی مورد نظر با موفقیت ثبت شد",
    beltCreated,
  });
});

//@desc Delete Belt
//@route PUT /api/v1/belts/:id
//@acess  Private Admin Only
module.exports.deleteBelt = AsyncHandler(async (req, res) => {
  if (!isValidObjectId(req.params.id)) throw createError.BadRequest("شناسه وارد شده کمربند صحیح نمی باشد");
  await checkExistBelts(req.params.id);

  const deletedBelt = await beltModel.deleteOne({ _id: req.params.id });
  if (!deletedBelt.deletedCount) throw createError.InternalServerError("حذف زده کمربند با خطا مواجه شد");

  const result = await studentModel.updateMany({ beltID: req.params.id }, { $unset: { beltID: 1 } });

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "حذف کمربند با موفقیت انجام شد",
  });
});

const checkExistBelts = async (id) => {
  // find Belt
  const beltFound = await beltModel.findById(id);
  if (!beltFound) throw createError.NotFound("کمربند وارد شده یافت نشد");
};
