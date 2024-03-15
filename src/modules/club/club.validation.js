const { body } = require("express-validator");
const createHttpError = require("http-errors");

const { removeDuplicatesArray, convarteStringToArray } = require("../../common/utils/function");
const sportService = require("../baseData/sport/sport.service");
const clubService = require("./club.service");
const userService = require("../user/user.service");

function ClubValidationRequired() {
  return [
    body("name")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 100 })
      .custom(async (name, { req }) => {
        await clubService.checkExistClubByName(name);
      }),

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

    body("sports")
      .exists({ nullable: true, checkFalsy: true })
      .customSanitizer((sports) => convarteStringToArray(sports))
      .isArray()
      .customSanitizer((sports) => removeDuplicatesArray(sports))
      .custom(async (sports) => {
        for (const sportID of sports) {
          await sportService.checkExistSportByID(sportID);
        }
      }),

    body("adminClub")
      .if((value, { req }) => req.userAuth.role == "SUPER_ADMIN")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 100 })
      .custom(async (adminClub, { req }) => {
        await userService.checkExistUserByID(adminClub);
      }),
  ];
}
function ClubValidationOptional() {
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
        await clubService.checkExistClubByName(name);
      }),

    body("genders")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .customSanitizer((genders) => convarteStringToArray(genders))
      .isArray()
      .customSanitizer((genders) => removeDuplicatesArray(genders))
      .custom(async (genders) => {
        const gendersValid = ["آقایان", "بانوان"];
        for (const gender of genders) {
          if (!gendersValid?.includes(gender)) throw createHttpError.BadRequest();
        }
      })
      .withMessage(),

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
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .customSanitizer((sports) => convarteStringToArray(sports))
      .isArray()
      .customSanitizer((sports) => removeDuplicatesArray(sports))
      .custom(async (sports) => {
        for (const sportID of sports) {
          await sportService.checkExistSportByID(sportID);
        }
      }),
  ];
}

module.exports = { ClubValidationRequired, ClubValidationOptional };
