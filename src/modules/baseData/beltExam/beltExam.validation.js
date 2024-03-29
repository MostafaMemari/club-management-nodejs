const { body } = require("express-validator");
const createHttpError = require("http-errors");

const { RegExDateShmasi } = require("../../../common/constant/constans");
const { normalizeCalendar } = require("../../../common/utils/normalizeData");
const { removeDuplicatesArray, convarteStringToArray } = require("../../../common/utils/function");

const beltService = require("../belt/belt.service");
const beltExamService = require("./beltExam.service");

function BeltExamValidationRequired() {
  return [
    body("name")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 100 })
      .withMessage("نام رویداد وارد شده معتبر نمی باشد"),

    body("genders")
      .exists({ nullable: true, checkFalsy: true })
      .customSanitizer((genders) => convarteStringToArray(genders))
      .isArray()
      .customSanitizer((genders) => removeDuplicatesArray(genders))
      .custom(async (genders) => {
        const gendersValid = ["آقایان", "بانوان"];

        for (const gender of genders) {
          if (!gendersValid?.includes(gender)) throw createHttpError.BadRequest("جنسیت وارد شده معتبر نمی باشد");
        }
      })
      .withMessage("جنسیت وارد شده معتبر نمی باشد"),

    body("belts")
      .exists({ nullable: true, checkFalsy: true })
      .customSanitizer((belts) => convarteStringToArray(belts))
      .isArray()
      .customSanitizer((belts) => removeDuplicatesArray(belts))
      .custom(async (belts) => {
        for (const beltID of belts) {
          await beltService.checkExistBeltByID(beltID);
        }
      }),
    body("eventDate")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ برگزاری آزمون معتبر نمی باشد"),

    body("registerDate")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ ثبت نام آزمون معتبر نمی باشد"),
  ];
}
function BeltExamValidationOptional() {
  return [
    body("name")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 100 })
      .withMessage("نام رویداد وارد شده معتبر نمی باشد"),

    body("description").optional({ nullable: true, checkFalsy: true }).trim().notEmpty().escape().isString().isLength({ min: 2, max: 200 }),

    body("eventPlace")
      .optional({ nullable: true, checkFalsy: true })
      .customSanitizer((place) => convarteStringToArray(place))
      .isArray()
      .withMessage("محل برگزاری آزمون معتبر نمی باشد"),

    body("genders")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .customSanitizer((genders) => convarteStringToArray(genders))
      .isArray()
      .customSanitizer((genders) => removeDuplicatesArray(genders))
      .custom(async (genders) => {
        const gendersValid = ["آقایان", "بانوان"];
        for (const gender of genders) {
          if (!gendersValid?.includes(gender)) throw createHttpError.BadRequest("جنسیت وارد شده معتبر نمی باشد");
        }
      })
      .withMessage("جنسیت وارد شده معتبر نمی باشد"),

    body("belts")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .customSanitizer((belts) => convarteStringToArray(belts))
      .isArray()
      .customSanitizer((belts) => removeDuplicatesArray(belts))
      .custom(async (belts) => {
        for (const beltID of belts) {
          await beltService.checkExistBeltByID(beltID);
        }
      }),
    body("eventDate")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ برگزاری آزمون معتبر نمی باشد"),

    body("registerDate")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ ثبت نام آزمون معتبر نمی باشد"),
  ];
}

module.exports = { BeltExamValidationRequired, BeltExamValidationOptional };
