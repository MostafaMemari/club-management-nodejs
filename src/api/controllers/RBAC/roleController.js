const AsyncHandler = require("express-async-handler");
const { createRoleSchema } = require("../../validations/RBAC.Schema");
const { roleModel } = require("../../models/RBAC/roleModel");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");

//@desc Create Role
//@route POST /api/v1/roles
//@acess  Private SUPER_Admin Only
module.exports.createRole = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  // validate
  const { title } = await createRoleSchema.validateAsync(data);

  await checkExistRoleTitle(title);

  // create
  const roleFound = new roleModel(data);
  await roleFound.save();
  if (!roleFound) throw createError.InternalServerError("ثبت نقش با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "ثبت نقش با موفقیت انجام شد",
  });
});

//@desc Get All Roles
//@route GET /api/v1/Roles
//@acess  Private Admin Only
module.exports.getRoles = AsyncHandler(async (req, res) => {
  const roleFound = await roleModel.find({}).lean();
  if (!roleFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: roleFound,
  });
});

const checkExistRoleID = async (id) => {
  if (!isValidObjectId(id)) throw createError.BadRequest("نفش وارد شده معتبر نمی باشد");

  // find Role
  const roleFound = await roleModel.findById(id).lean();
  if (!roleFound) throw createError.NotFound("نقش مورد نظر یافت نشد");
  return roleFound;
};
const checkExistRoleTitle = async (title) => {
  // find Role
  const roleFound = await roleModel.findOne({ title });
  if (roleFound) throw createError.NotFound("نقش مورد نظر تکراری می باشد");
  return roleFound;
};
