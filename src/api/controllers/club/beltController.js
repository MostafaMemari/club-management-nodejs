const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { beltSchema } = require("../../validations/clubSchema");
const { StatusCodes } = require("http-status-codes");
const { beltModel } = require("../../models/club/beltModel");
const createError = require("http-errors");

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
    data,
  });
});
