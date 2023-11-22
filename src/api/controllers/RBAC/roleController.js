const AsyncHandler = require("express-async-handler");
const { roleSchema } = require("../../validations/RBAC.Schema");
const { roleModel } = require("../../models/RBAC/roleModel");
const { copyObject, deleteInvalidPropertyInObject, validateItemArrayModel } = require("../../helpers/function");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const { permissionModel } = require("../../models/RBAC/permissionModel");

//@desc Create Role
//@route POST /api/v1/roles
//@acess  Private SUPER_Admin Only
module.exports.createRole = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data);

  // validate
  const { title } = await roleSchema.validateAsync(data);
  if (!title) throw createError.BadRequest("عنوان نقش نمی تواند خالی باشد");

  await checkExistRoleTitle(title);

  // Normalize Permission
  let permissionsID = data.permissions || [];
  permissionsID = typeof permissionsID == "string" ? permissionsID.replace(/\s/g, "").split(" ") : permissionsID;
  // find And Validate Permission
  const permissions = await validateItemArrayModel(permissionModel, permissionsID);

  // create
  const roleFound = new roleModel({ ...data, permissions });
  await roleFound.save();
  if (!roleFound) throw createError.InternalServerError("ثبت نقش با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "ثبت نقش با موفقیت انجام شد",
  });
});

//@desc Update Role
//@route PUT /api/v1/roles/:id
//@acess  Private SUPER_Admin Only
module.exports.updateRole = AsyncHandler(async (req, res) => {
  await checkExistRoleID(req.params.id);

  const data = copyObject(req.body);
  deleteInvalidPropertyInObject(data, ["permissions"]);

  // validate
  await roleSchema.validateAsync(data);

  const { name } = data;
  // find role
  if (name) {
    const roleFound = await roleModel.findOne({ name });
    if (roleFound) throw createError.Conflict("نقش وارد شده تکراری می باشد");
  }

  // update
  const roleUpdated = await roleModel.updateOne({ _id: req.params.id }, data);
  if (!roleUpdated) throw createError.InternalServerError("بروزرسانی رشته ورزشی با خطا مواجه شد");

  res.status(StatusCodes.CREATED).json({
    status: "success",
    message: "بروزرسانی رشته ورزشی با موفقیت انجام شد",
  });
});

//@desc Get All Roles
//@route GET /api/v1/Roles
//@acess  Private SUPER_Admin Only
module.exports.getRoles = AsyncHandler(async (req, res) => {
  const roleFound = await roleModel.find({}).populate("permissions").lean();
  if (!roleFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: roleFound,
  });
});

//@desc Get Single Role
//@route GET /api/v1/roles/:id
//@acess  Private SUPER_Admin Only
module.exports.getRole = AsyncHandler(async (req, res) => {
  const roleFound = await checkExistRoleID(req.params.id);

  if (!roleFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
  res.status(StatusCodes.OK).json({
    status: "success",
    message: "دریافت اطلاعات با موفقیت انجام شد",
    data: roleFound,
  });
});

//@desc Delete Role
//@route Delete /api/v1/roles/:id
//@acess  Private SUPER_Admin Only
module.exports.deleteRole = AsyncHandler(async (req, res) => {
  await checkExistRoleID(req.params.id);

  const deletedRole = await roleModel.deleteOne({ _id: req.params.id });
  if (!deletedRole.deletedCount) throw createError.InternalServerError("حذف نقش با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "حذف نقش با موفقیت انجام شد",
  });
});

//@desc Add Belt to beltExam
//@route PATCH /api/v1/roles/:id/permission/add
//@acess  Private SUPER_Admin Only
module.exports.addPermissionToRole = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  const blackListFields = ["title", "description"];
  deleteInvalidPropertyInObject(data, blackListFields);

  // validate
  await checkExistRoleID(req.params.id);

  // Normalize Permission
  let permissionsID = data.permissions || [];
  permissionsID = typeof permissionsID == "string" ? permissionsID.replace(/\s/g, "").split(" ") : permissionsID;
  // find And Validate Permission
  const permissions = await validateItemArrayModel(permissionModel, permissionsID);

  // add belt to BeltExam
  const roleUpdated = await roleModel.updateOne({ _id: req.params.id }, { $addToSet: { permissions } });
  if (!roleUpdated.modifiedCount) throw createError.InternalServerError("ایجاد سطح دسترسی نقش با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "سطح دسترسی مورد نظر با موفقیت به نقش اختصاص یافت",
  });
});

//@desc Remove Permission to beltExam
//@route PATCH /api/v1/roles/:id/permission/:permissionID/remove
//@acess  Private SUPER_Admin Only
module.exports.removePermissionToRole = AsyncHandler(async (req, res, next) => {
  const data = copyObject(req.body);
  const blackListFields = ["title", "description"];
  deleteInvalidPropertyInObject(data, blackListFields);

  const { id: roleID, permissionID } = req.params;

  // validate
  if (!isValidObjectId(permissionID)) throw createError.BadRequest("شناسه سطح دسترسی معتبر نمی باشد");

  // find belt exam
  const roleFound = await checkExistRoleID(roleID);

  // find belt
  if (permissionID) {
    const permissionFound = await permissionModel.findById(permissionID).lean();
    if (!permissionFound) throw createError.NotFound("سطح دسترسی وارد شده صحیح نمی باشد");
  }

  const permissionArr = roleFound.permissions.map((objectId) => objectId.toString());
  // check Permission in Role
  if (!permissionArr.includes(permissionID)) throw createError.NotFound("سطح دسترسی وارد شده یافت نشد");

  // remove Permission
  const removePermossion = await roleModel.updateOne({ _id: roleID }, { $pull: { permissions: permissionID } });
  if (!removePermossion.modifiedCount) throw createError.InternalServerError("حذف سطح دسترسی با خطا مواجه شد");

  res.status(StatusCodes.OK).json({
    status: "success",
    message: "سطح دسترسی مورد نظر با موفقیت از نقش حذف شد",
  });
});

const checkExistRoleID = async (id) => {
  if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

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
