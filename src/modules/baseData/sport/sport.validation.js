const { body } = require("express-validator");
const { SportModel } = require("./sport.model");
const createHttpError = require("http-errors");

function SportValidation() {
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
        const sportNameExist = await SportModel.findOne({ name });
        if (sportNameExist) throw createHttpError.Conflict("رشته ورزشی وارد شده قبلا داخل سیستم ثبت شده است");
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

module.exports = { SportValidation };
