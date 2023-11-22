const AsyncHandler = require("express-async-handler");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { permissionSchema } = require("../../validations/RBAC.Schema");
const createError = require("http-errors");
const { permissionModel } = require("../../models/RBAC/permissionModel");
const { StatusCodes } = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const { roleModel } = require("../../models/RBAC/roleModel");

//@desc Create Permission
//@route POST /api/v1/permissions
//@acess  Private SUPER_Admin Only
module.exports.createPermission = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  // validate
  const { name } = await permissionSchema.validateAsync(data);
  if (!name) throw createError.BadRequest("عنوان نقش نمی تواند خالی باشد");

  await checkExistPermissionName(name);

  // create
  const permissionFound = new permissionModel(data);
  await permissionFound.save();
  if (!permissionFound) throw createError.InternalServerError("ثبت سطح دسترسی با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "ثبت سطح دسترسی با موفقیت انجام شد",
  });
});

//@desc Update Permission
//@route PUT /api/v1/permissions/:id
//@acess  Private SUPER_Admin Only
module.exports.updatePermission = AsyncHandler(async (req, res) => {
  await checkExistPermissionID(req.params.id);

  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  // validate
  const { name } = await permissionSchema.validateAsync(data);

  // find Permission
  if (name) {
    const permissionFound = await permissionModel.findOne({ name });
    if (permissionFound) throw createError.Conflict("نقش وارد شده تکراری می باشد");
  }

  // update
  const permissionUpdated = await permissionModel.updateOne({ _id: req.params.id }, data);
  if (!permissionUpdated) throw createError.InternalServerError("بروزرسانی رشته ورزشی با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "بروزرسانی رشته ورزشی با موفقیت انجام شد",
  });
});

//@desc Delete Permission
//@route DELETE /api/v1/permissions/:id
//@acess  Private SUPER_Admin Only
module.exports.removePermission = AsyncHandler(async (req, res) => {
  await checkExistPermissionID(req.params.id);

  // Remove Permission By Role
  await roleModel.updateMany({ permissions: req.params.id }, { $pull: { permissions: req.params.id } });

  // update
  const permissionDeleted = await permissionModel.deleteOne({ _id: req.params.id });
  if (!permissionDeleted) throw createError.InternalServerError("حذف سطح دسترسی با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "حدف سطح دسترسی با موفقیت انجام شد",
  });
});

//@desc Get Single Permission
//@route GET /api/v1/permissions/:id
//@acess  Private SUPER_Admin Only
module.exports.getPermission = AsyncHandler(async (req, res) => {
  const permissionFound = await checkExistPermissionID(req.params.id);

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: permissionFound,
  });
});

//@desc Get All Permissions
//@route GET /api/v1/permissions/
//@acess  Private SUPER_Admin Only
module.exports.getPermissions = AsyncHandler(async (req, res) => {
  const permissionFound = await permissionModel.find({}).lean();

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: permissionFound,
  });
});

async function checkExistPermissionName(name) {
  const permissionFound = await permissionModel.findOne({ name });
  if (permissionFound) throw createError.BadRequest("سطح دسترسی وارد شده تکراری می باشد");
  return permissionFound;
}
async function checkExistPermissionID(id) {
  if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

  const permissionFound = await permissionModel.findById(id);
  if (!permissionFound) throw createError.BadRequest("سطح دسترسی مورد نظر یافت نشد");
  return permissionFound;
}
