const { body, param } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const { RegExUserName } = require("../../common/utils/constans");
const createHttpError = require("http-errors");
const userService = require("./user.service");

function UserValidationRequired() {
  return [
    body("username")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .escape()
      // .matches(RegExUserName)
      .withMessage("You must type a username")
      .custom(async (username) => {
        await userService.checkExistUserByUsername(username);
      }),
    body("email")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .escape()
      .isEmail()
      .withMessage("You must type a email")
      .custom(async (email) => {
        await userService.checkExistUserByEmail(email);
      }),

    body("password").exists({ nullable: true, checkFalsy: true }).trim().isString().notEmpty().withMessage("You must type a password"),

    body("confirmPassword")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .isString()
      .notEmpty()
      .withMessage("You must type a confirmation password")
      .custom((value, { req }) => {
        if (value !== req.body.password) throw createHttpError.BadRequest("The passwords do not match");
        return true;
      }),
  ];
}
function UserValidationOptional() {
  return [
    body("username")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .escape()
      .matches(RegExUserName)
      .withMessage("username not valid")
      .custom(async (username) => {
        await userService.checkExistUserByUsername(username);
      }),

    body("email")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .escape()
      .isEmail()
      .withMessage("email not valid")
      .custom(async (email) => {
        await userService.checkExistUserByEmail(email);
      }),

    body("password")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .withMessage("You must type a password"),

    body("confirmPassword")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .withMessage("You must type a confirmation password")
      .custom((value, { req }) => {
        if (value !== req.body.password) throw createHttpError.BadRequest("The passwords do not match");
      }),

    body("role")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .isIn(["ADMIN_CLUB", "SUPER_ADMIN"])
      .withMessage("role is not valid"),
  ];
}

module.exports = { UserValidationRequired, UserValidationOptional };
