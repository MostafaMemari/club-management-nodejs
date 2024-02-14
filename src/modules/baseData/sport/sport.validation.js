const { body } = require("express-validator");
const { SportModel } = require("./sport.model");
const createHttpError = require("http-errors");
const sportService = require("./sport.service");

function SportValidationRequired() {
  return [
    body("name")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("رشته ورزشی وارد شده معتبر نمی باشد")
      .custom(async (name, { req }) => {
        await sportService.checkExistSportByName(name);
      }),
  ];
}
function SportValidationOptional() {
  return [
    body("name")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("رشته ورزشی وارد شده معتبر نمی باشد")
      .custom(async (name, { req }) => {
        await sportService.checkExistSportByName(name);
      }),
    body("type")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("نوع رشته ورزشی معتبر نمی باشد"),

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

module.exports = { SportValidationRequired, SportValidationOptional };
