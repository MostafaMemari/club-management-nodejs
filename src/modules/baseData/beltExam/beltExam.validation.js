const { body } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const { RegExDateShmasi } = require("../../../common/utils/constans");
const { normalizeCalendar } = require("../../../common/utils/normalizeData");
const { BeltExamModel } = require("./beltExam.model");
const createHttpError = require("http-errors");
const { BeltModel } = require("../belt/belt.model");
const { removeDuplicatesArray } = require("../../../common/utils/function");
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
      .custom(async (name, { req }) => {
        await beltExamService.checkExistBeltExamByName(name);
      }),

    body("genders")
      .exists({ nullable: true, checkFalsy: true })
      .customSanitizer((gender) => {
        if (Array.isArray(gender)) {
          return gender;
        } else {
          return gender?.split(",");
        }
      })
      .isArray()
      .custom(async (gendersBody) => {
        const gendersValid = ["آقایان", "بانوان"];
        const genders = removeDuplicatesArray(gendersBody);

        for (const gender of genders) {
          if (!gendersValid?.includes(gender)) throw createHttpError.BadRequest("جنسیت وارد شده معتبر نمی باشد");
        }
      })
      .withMessage("جنسیت وارد شده معتبر نمی باشد"),

    body("belts")
      .exists({ nullable: true, checkFalsy: true })
      .customSanitizer((belts) => {
        if (Array.isArray(belts)) {
          return belts;
        } else {
          return belts?.split(",");
        }
      })
      .isArray()
      .custom(async (beltsBody) => {
        const belts = removeDuplicatesArray(beltsBody);
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
      .custom(async (name, { req }) => {
        await beltExamService.checkExistBeltExamByName(name);
      }),

    body("description").optional({ nullable: true, checkFalsy: true }).trim().notEmpty().escape().isString().isLength({ min: 2, max: 200 }),

    body("eventPlace")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 1, max: 100 })
      .withMessage("محل برگزاری آزمون معتبر نمی باشد"),

    body("genders")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .customSanitizer((gender) => {
        if (Array.isArray(gender)) {
          return gender;
        } else {
          return gender?.split(",");
        }
      })
      .isArray()
      .custom(async (gendersBody) => {
        const gendersValid = ["آقایان", "بانوان"];
        const genders = removeDuplicatesArray(gendersBody);

        for (const gender of genders) {
          if (!gendersValid?.includes(gender)) throw createHttpError.BadRequest("جنسیت وارد شده معتبر نمی باشد");
        }
      })
      .withMessage("جنسیت وارد شده معتبر نمی باشد"),

    body("belts")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .customSanitizer((belts) => {
        if (Array.isArray(belts)) {
          return belts;
        } else {
          return belts?.split(",");
        }
      })
      .isArray()
      .custom(async (beltsBody) => {
        const belts = removeDuplicatesArray(beltsBody);
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
