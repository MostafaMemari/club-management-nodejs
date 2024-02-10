const { body } = require("express-validator");
const createHttpError = require("http-errors");
const { PermissionModel } = require("./permission.model");

function PermissionValidation() {
  return [
    body("name")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("سطح دسترسی معتبر نمی باشد")
      .custom(async (name, { req }) => {
        const permissionNameExist = await PermissionModel.findOne({ name });
        if (permissionNameExist) throw createHttpError.Conflict("سطح دسترسی وارد شده قبلا داخل سیستم ثبت شده است");
      }),

    body("description")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 100 })
      .withMessage("توضیحات رشته ورزشی معتبر نمی باشد"),
  ];
}

module.exports = { PermissionValidation };
