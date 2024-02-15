const createHttpError = require("http-errors");
const { body } = require("express-validator");

const { RegExDateShmasi } = require("../../common/utils/constans");
const { normalizeCalendar, normalizePhoneNumber } = require("../../common/utils/normalizeData");

const { CoachModel } = require("./coach.model");
const { ClubModel } = require("../club/club.model");
const { BeltModel } = require("../baseData/belt/belt.model");
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

    body("nationalID")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 10, max: 10 })
      .withMessage("NationalID is not valid")
      .custom(async (nationalID, { req }) => {
        await coachService.checkExistCoachByNationalID(nationalID);
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

    body("nationalID")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 10, max: 10 })
      .withMessage("NationalID is not valid")
      .custom(async (nationalID, { req }) => {
        await coachService.checkExistCoachByNationalID(nationalID);
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

    body("gender").optional({ nullable: true, checkFalsy: true }).isString().trim().notEmpty().escape().isIn(["زن", "مرد"]).withMessage("Gender is not valid"),

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
      .isLength({ min: 10, max: 50 })
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

    body("belt")
      .optional({ nullable: true, checkFalsy: true })
      .isMongoId()
      .custom(async (beltID, { req }) => {
        await beltService.checkExistBeltByID(beltID);
      }),

    body("clubs")
      .optional({ nullable: true, checkFalsy: true })
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

module.exports = { CoachValidationRequired, CoachValidationOptional };
