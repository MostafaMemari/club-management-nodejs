const { body } = require("express-validator");
const { RegExDateShmasi } = require("../../../common/utils/constans");
const { isValidObjectId } = require("mongoose");
const { normalizeCalendar, normalizePhoneNumber } = require("../../../common/utils/normalizeData");
const { CoachModel } = require("../coach/coach.model");
const { ClubModel } = require("../../management/club/club.model");
const { BeltModel } = require("../../baseData/belt/belt.model");

function studentRegisterValidate() {
  return [
    body("firstName").isString().trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage("نام وارد شده معتبر نمی باشد"),
    body("lastName").isString().trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage("نام خانوادگی وارد شده معتبر نمی باشد"),
    body("nationalID").isString().trim().notEmpty().isLength({ min: 10, max: 10 }).withMessage("کد ملی وارد شده معتبر نمی باشد"),

    body("imageUrl")
      .optional()
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((image) => (image = image.replace(/\\/g, "/"))),

    body("role").optional().isString().trim().notEmpty().isIn(["STUDENT", "COACH"]).withMessage("نقش وارد شده معتبر نمی باشد"),
    body("gender").optional().isString().trim().notEmpty().isIn(["زن", "مرد"]).withMessage("جنسیت وارد شده اشتباه می باشد"),

    body("mobile")
      .optional()
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((phone) => (phone = normalizePhoneNumber(phone)))
      .isMobilePhone("ir-IR")
      .withMessage("شماره موبایل وارد شده معتبر نمی باشد"),

    body("fatherName").optional().isString().trim().notEmpty().isLength({ min: 2, max: 50 }).withMessage("نام پدر وارد شده معتبر نمی باشد"),
    body("address").optional().isString().trim().notEmpty().isLength({ min: 10, max: 50 }).withMessage("آدرس وارد شده معتبر نمی باشد"),
    body("phone").optional().isString().trim().notEmpty().isLength({ min: 9, max: 12 }).withMessage("شماره تلفن وارد شده معتبر نمی باشد"),

    body("memberShipValidity").optional().trim().notEmpty().isInt({ gt: 1370, lt: 1450 }).toInt().withMessage("اعتبار عضویت وارد شده معتبر نمی باشد"),
    body("registerDateShamsi")
      .optional()
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ ثبت نام معتبر نمی باشد"),
    body("birthDayShamsi")
      .optional()
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ تولد معتبر نمی باشد"),
    body("sportsInsuranceDateShamsi")
      .optional()
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ بیمه ورزشی معتبر نمی باشد"),
    body("beltDateShamsi")
      .optional()
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ اخذ کمربند معتبر نمی باشد"),

    body("coach")
      .optional()
      .custom(async (value) => {
        if (isValidObjectId(value)) {
          const checkExistCoach = await CoachModel.findById(value);
          if (!checkExistCoach) {
            throw new Error("مربی یافت نشد");
          }
        } else {
          throw new Error("شناسه وارد شده معتبر نمی باشد");
        }
      }),
    body("club")
      .optional()
      .custom(async (value) => {
        if (isValidObjectId(value)) {
          const checkExistClub = await ClubModel.findById(value);
          if (!checkExistClub) {
            throw new Error("باشگاه یافت نشد");
          }
        } else {
          throw new Error("شناسه وارد شده معتبر نمی باشد");
        }
      }),
    body("belt")
      .optional()
      .custom(async (value) => {
        if (isValidObjectId(value)) {
          const checkExistBelt = await BeltModel.findById(value);
          if (!checkExistBelt) {
            throw new Error("کمربند یافت نشد");
          }
        } else {
          throw new Error("شناسه وارد شده معتبر نمی باشد");
        }
      }),

    // body("createdBy").optional().isMongoId().withMessage("شناسه ثبت کننده معتبر نمی باشد"),
    // body("imageUrl").string() .error(new Error("تصویر ثبت شده معتبر نمی باشد")),
  ];
}

module.exports = { studentRegisterValidate };
