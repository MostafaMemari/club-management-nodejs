const createHttpError = require("http-errors");
const { body } = require("express-validator");

const { RegExDateShmasi } = require("../../common/utils/constans");
const { normalizeCalendar, normalizePhoneNumber } = require("../../common/utils/normalizeData");

const { CoachModel } = require("../coach/coach.model");
const { ClubModel } = require("../club/club.model");
const { BeltModel } = require("../baseData/belt/belt.model");

function StudentValidationRequired() {
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
      .withMessage("NationalID is not valid"),
  ];
}
function StudentValidationOptional() {
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
      .withMessage("NationalID is not valid"),

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

    body("phone")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 9, max: 12 })
      .withMessage("Phone number is not valid"),

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

    body("sportsInsuranceDate")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("Date sports insurance is not valid"),

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
      .custom(async (value, { req }) => {
        if (req.body?.beltDate) {
          const checkExistBelt = await BeltModel.findById(value);
          if (!checkExistBelt) {
            throw new Error("Belt not found");
          }
        } else {
          throw new Error("Please enter the date of the belt");
        }
      }),
    body("coach")
      .optional({ nullable: true, checkFalsy: true })
      .isMongoId()
      .custom(async (value) => {
        const checkExistCoach = await CoachModel.findById(value);
        if (!checkExistCoach) {
          throw new Error("Coach not found");
        }
      }),

    body("club")
      .optional({ nullable: true, checkFalsy: true })
      .isMongoId()
      .custom(async (value) => {
        const checkExistClub = await ClubModel.findById(value);
        if (!checkExistClub) {
          throw new Error("Club not found");
        }
      }),
  ];
}

module.exports = { StudentValidationRequired, StudentValidationOptional };
