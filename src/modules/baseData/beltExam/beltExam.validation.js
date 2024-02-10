const { body } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const { RegExDateShmasi } = require("../../../common/utils/constans");
const { normalizeCalendar } = require("../../../common/utils/normalizeData");
const { BeltExamModel } = require("./beltExam.model");
const createHttpError = require("http-errors");
const { BeltModel } = require("../belt/belt.model");
const { removeDuplicatesArray } = require("../../../common/utils/function");

function BeltExamValidation() {
  return [
    body("name")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 100 })
      .custom(async (name, { req }) => {
        const beltExamByNameExist = await BeltExamModel.findOne({ name });
        if (beltExamByNameExist) throw createHttpError.Conflict("آزمون کمربند قبلا داخل سیستم ثبت شده است");
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
          if (!gendersValid?.includes(gender)) throw createHttpError("جنسیت وارد شده معتبر نمی باشد");
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
        for (const belt of belts) {
          if (isValidObjectId(belt)) {
            const beltExist = await BeltModel.findById(belt).lean();
            if (!beltExist) {
              throw createHttpError.BadRequest(`کمربند یافت نشد`);
            }
          } else {
            throw createHttpError.BadRequest(`شناسه کمربند وارد شده معتبر نمی باشد - ${belt}`);
          }
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

module.exports = { BeltExamValidation };
