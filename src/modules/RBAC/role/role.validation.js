const { body } = require("express-validator");
const createHttpError = require("http-errors");
const { RoleModel } = require("./role.model");
const { removeDuplicatesArray } = require("../../../common/utils/function");
const { PermissionModel } = require("../permission/permission.model");
const { isValidObjectId } = require("mongoose");
const roleService = require("./role.service");
const permissionService = require("../permission/permission.service");

function RoleValidationRequired() {
  return [
    body("name")
      .if((value, { req }) => req.method !== "POST")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("نقش وارد شده معتبر نمی باشد")
      .custom(async (name, { req }) => {
        await roleService.checkExistRoleByName(name);
      }),
  ];
}
function RoleValidationOptional() {
  return [
    body("name")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("role is not valid")
      .custom(async (name, { req }) => {
        await roleService.checkExistRoleByName(name);
      }),

    body("description")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 100 })
      .withMessage("description role is not valid"),

    body("permissions")
      .optional({ nullable: true, checkFalsy: true })
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
      .customSanitizer((permissions) => removeDuplicatesArray(permissions))
      .custom(async (permissions) => {
        for (const permissionID of permissions) {
          await permissionService.checkExistPermissionByID(permissionID);
        }
      })
      .withMessage("permissions is not valid"),
  ];
}

module.exports = { RoleValidationRequired, RoleValidationOptional };
