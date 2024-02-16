const { PERMISSIONS } = require("../utils/constans");
const AsyncHandler = require("express-async-handler");
const { RoleModel } = require("../../modules/RBAC/role/role.model");
const createHttpError = require("http-errors");
const { PermissionModel } = require("../../modules/RBAC/permission/permission.model");

function checkPermission(requiredPermissions = []) {
  return AsyncHandler(async function (req, res, next) {
    const allPermissions = requiredPermissions.flat(2);

    const user = req.userAuth;

    const role = await RoleModel.findOne({ name: user.role });
    if (!role) throw createHttpError.BadRequest("نقش شما توسط سیستم تعریف نشده است");

    const permissions = await PermissionModel.find({ _id: { $in: role.permissions } });

    const userPermissions = permissions.map((item) => item.name);

    const hasPermission = allPermissions.every((permission) => {
      return userPermissions.includes(permission);
    });

    if (userPermissions.includes(PERMISSIONS.ALL)) return next();
    if (allPermissions.length == 0 || hasPermission) return next();
    throw createHttpError.Forbidden("شما به این قسمت دسترسی ندارید");
  });
}
module.exports = { checkPermission };
