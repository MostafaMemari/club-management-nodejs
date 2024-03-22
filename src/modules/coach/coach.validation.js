const createHttpError = require("http-errors");
const { body } = require("express-validator");

const { RegExDateShmasi } = require("../../common/constant/constans");
const { normalizeCalendar, normalizePhoneNumber } = require("../../common/utils/normalizeData");

const beltService = require("../baseData/belt/belt.service");
const clubService = require("../club/club.service");
const coachService = require("./coach.service");
const { convarteStringToArray, removeDuplicatesArray } = require("../../common/utils/function");

function CoachValidationRequired() {
  return [
    body("firstName")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("FirstName is not valid"),

    body("lastName")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("LastName is not valid"),

    body("gender").optional({ nullable: true, checkFalsy: true }).isString().trim().notEmpty().escape().isIn(["زن", "مرد"]).withMessage("Gender is not valid"),

    body("clubs")
      .optional({ nullable: true, checkFalsy: true })
      .notEmpty()
      .customSanitizer((clubs) => convarteStringToArray(clubs))
      .isArray()
      .customSanitizer((clubs) => removeDuplicatesArray(clubs))
      .custom(async (clubs) => {
        for (const clubID of clubs) {
          await clubService.checkExistClubByID(clubID);
        }
      }),
  ];
}
function CoachValidationOptional() {
  return [
    body("firstName")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("FirstName is not valid"),

    body("lastName")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("LastName is not valid"),

    body("gender")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isIn(["زن", "مرد"])
      .withMessage("Gender is not valid"),

    body("clubs")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .customSanitizer((clubs) => convarteStringToArray(clubs))
      .isArray()
      .customSanitizer((clubs) => removeDuplicatesArray(clubs))
      .custom(async (clubs) => {
        for (const clubID of clubs) {
          await clubService.checkExistClubByID(clubID);
        }
      }),

    body("nationalCode")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 10, max: 10 })
      .withMessage("NationalCode is not valid")
      .custom(async (nationalCode, { req }) => {
        await coachService.checkExistCoachByNationalCode(nationalCode);
      }),

    body("imageUrl")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((image) => (image = image.replace(/\\/g, "/"))),

    body("role")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isIn(["STUDENT", "COACH"])
      .withMessage("Role is Not valid"),

    body("mobile")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .customSanitizer((phone) => (phone = normalizePhoneNumber(phone)))
      .isMobilePhone("ir-IR")
      .withMessage("Mobile number is not valid"),

    body("fatherName")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("Father name is not valid"),

    body("address")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 10, max: 250 })
      .withMessage("Address is not valid"),

    body("registerDate")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("Date register is not valid"),

    body("birthDay")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("Date birthDay is not valid"),

    body("memberShipValidity")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isInt({ gt: 1370, lt: 1450 })
      .toInt()
      .withMessage("Membership validity is not valid"),

    body("beltDate")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("Date belt is not valid")
      .custom((value, { req }) => {
        if (!req.body?.belt) {
          throw createHttpError.BadRequest("Please enter the belt");
        }
        return true;
      }),

    body("belt")
      .optional({ nullable: true, checkFalsy: true })
      .isMongoId()
      .custom(async (beltID, { req }) => {
        if (req.body?.beltDate) {
          await beltService.checkExistBeltByID(beltID);
        } else {
          throw new Error("Please enter the date of the belt");
        }
      }),
  ];
}

module.exports = { CoachValidationRequired, CoachValidationOptional };
