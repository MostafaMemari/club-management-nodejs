const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { clubSchema } = require("../../validations/clubSchema");
const { StatusCodes } = require("http-status-codes");
const { sportModel } = require("../../models/club/sportModel");

//@desc Create Club
//@route POST /api/v1/clubs
//@acess  Private Admin Only
module.exports.createClub = AsyncHandler(async (req, res) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  await clubSchema.validateAsync(data);

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "باشگاه با موفقیت ثبت شد",
    data,
  });
});
