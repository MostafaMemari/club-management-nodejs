const { body } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const { removeDuplicatesArray } = require("../../../common/utils/function");
const { ClubModel } = require("./club.model");
const { SportModel } = require("../../baseData/sport/sport.model");

function ClubValidation() {
  return [
    body("name")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 100 })
      .custom(async (name, { req }) => {
        const ClubByNameExist = await ClubModel.findOne({ name });
        if (ClubByNameExist) throw createHttpError.Conflict("باشگاه قبلا داخل سیستم ثبت شده است");
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

    body("address")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 10, max: 200 })
      .withMessage("آدرس وارد شده معتبر نمی باشد"),

    body("phone")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 9, max: 12 })
      .withMessage("شماره تلفن وارد شده معتبر نمی باشد"),

    body("sports")
      .exists({ nullable: true, checkFalsy: true })
      .customSanitizer((sports) => {
        if (Array.isArray(sports)) {
          return sports;
        } else {
          return sports?.split(",");
        }
      })
      .isArray()
      .custom(async (sportsBody) => {
        const sports = removeDuplicatesArray(sportsBody);
        for (const sport of sports) {
          if (isValidObjectId(sport)) {
            const sportExist = await SportModel.findById(sport).lean();
            if (!sportExist) {
              throw createHttpError.BadRequest(`رشته ورزشی یافت نشد`);
            }
          } else {
            throw createHttpError.BadRequest(`شناسه رشته ورزشی معتبر نمی باشد - ${sport}`);
          }
        }
      }),
  ];
}

module.exports = { ClubValidation };
