const createError = require("http-errors");
const { PERMISSIONS } = require("../utils/constans");
const { permissionModel } = require("../../modules/RBAC/permission/permissionModel");
const { roleModel } = require("../../modules/RBAC/role/roleModel");
const AsyncHandler = require("express-async-handler");

function checkPermission(requiredPermissions = []) {
  return AsyncHandler(async function (req, res, next) {
    const allPermissions = requiredPermissions.flat(2);

    const user = req.userAuth;

    // get Role user
    const role = await roleModel.findOne({ title: user.role });
    if (!role) throw createError.BadRequest("نقش شما توسط سیستم تعریف نشده است");

    // get Permissions Role
    const permissions = await permissionModel.find({ _id: { $in: role.permissions } });

    const userPermissions = permissions.map((item) => item.name);

    const hasPermission = allPermissions.every((permission) => {
      return userPermissions.includes(permission);
    });

    if (userPermissions.includes(PERMISSIONS.ALL)) return next();
    if (allPermissions.length == 0 || hasPermission) return next();
    throw createError.Forbidden("شما به این قسمت دسترسی ندارید");
  });
}
module.exports = {
  checkPermission,
};
