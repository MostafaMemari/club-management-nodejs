const { body } = require("express-validator");
const createHttpError = require("http-errors");
const { PermissionModel } = require("./permission.model");
const permissionService = require("./permission.service");

function PermissionValidationRequired() {
  return [
    body("name")
      .if((value, { req }) => req.method !== "POST")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("permission is not valid")
      .custom(async (name, { req }) => {
        await permissionService.checkExistPermissionByName(name);
      }),
  ];
}
function PermissionValidationOptional() {
  return [
    body("name")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("permission is not valid")
      .custom(async (name, { req }) => {
        await permissionService.checkExistPermissionByName(name);
      }),

    body("description")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 100 })
      .withMessage("description permission not valid"),
  ];
}

module.exports = { PermissionValidationRequired, PermissionValidationOptional };
