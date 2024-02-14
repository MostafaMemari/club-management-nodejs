const { body, param } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const { AgeGroupModel } = require("./ageGroup.model");
const { RegExDateShmasi } = require("../../../common/utils/constans");
const { normalizeCalendar } = require("../../../common/utils/normalizeData");
const ageGroupService = require("./ageGroup.service");

function AgeGroupValidationOptional() {
  return [
    body("name")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("age group is not valid")
      .custom(async (name) => {
        await ageGroupService.checkExistAgeGroupByName(name);
      }),

    body("description")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("توضیحات رده سنی معتبر نمی باشد"),

    body("fromDate")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ شروع رده سنی معتبر نمی باشد"),

    body("toDate")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ پایان رده سنی معتبر نمی باشد"),
  ];
}
function AgeGroupValidationRequired() {
  return [
    body("name")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("age group is not valid")
      .custom(async (name) => {
        await ageGroupService.checkExistAgeGroupByName(name);
      }),

    body("fromDate")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ شروع رده سنی معتبر نمی باشد"),

    body("toDate")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ پایان رده سنی معتبر نمی باشد"),
  ];
}

module.exports = { AgeGroupValidationOptional, AgeGroupValidationRequired };
