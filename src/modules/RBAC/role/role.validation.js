const { body } = require("express-validator");
const createHttpError = require("http-errors");
const { RoleModel } = require("./role.model");
const { removeDuplicatesArray } = require("../../../common/utils/function");
const { PermissionModel } = require("../permission/permission.model");
const { isValidObjectId } = require("mongoose");

function RoleValidation() {
  return [
    body("name")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("نقش وارد شده معتبر نمی باشد")
      .custom(async (name, { req }) => {
        const roleNameExist = await RoleModel.findOne({ name });
        if (roleNameExist) throw createHttpError.Conflict("نقش وارد شده تکراری می باشد");
      }),

    body("description")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 100 })
      .withMessage("توضیحات رشته ورزشی معتبر نمی باشد"),

    body("permissions")
      .exists({ nullable: true, checkFalsy: true })
      .notEmpty()
      .customSanitizer((permissions) => {
        if (permissions) {
          if (Array.isArray(permissions)) {
            return permissions;
          } else {
            return permissions?.split(",");
          }
        } else {
          return false;
        }
      })
      .isArray()
      .custom(async (permissionBody) => {
        const permissions = removeDuplicatesArray(permissionBody);
        for (const permission of permissions) {
          if (isValidObjectId(permission)) {
            const permissionExist = await PermissionModel.findById(permission).lean();
            if (!permissionExist) {
              throw createHttpError.BadRequest(`سطح دسترسی یافت نشد`);
            }
          } else {
            throw createHttpError.BadRequest(`شناسه سطح دسترسی وارد شده معتبر نمی باشد - ${permissions}`);
          }
        }
      })
      .withMessage("سطح دسترسی وارد شده معتبر نمی باشد"),
  ];
}

module.exports = { RoleValidation };
