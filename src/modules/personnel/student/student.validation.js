const { body, checkExact, param } = require("express-validator");
const { RegExDateShmasi } = require("../../../common/utils/constans");
const { isValidObjectId } = require("mongoose");
const { normalizeCalendar, normalizePhoneNumber } = require("../../../common/utils/normalizeData");
const { CoachModel } = require("../coach/coach.model");
const { ClubModel } = require("../../management/club/club.model");
const { BeltModel } = require("../../baseData/belt/belt.model");
const createHttpError = require("http-errors");
const { StudentModel } = require("./student.model");

function StudentRegisterInitialRequiredData() {
  return [
    body("firstName")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("نام وارد شده معتبر نمی باشد"),

    body("lastName")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("نام خانوادگی وارد شده معتبر نمی باشد"),

    body("nationalID")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 10, max: 10 })
      .withMessage("کد ملی وارد شده معتبر نمی باشد"),

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
      .withMessage("نقش وارد شده معتبر نمی باشد"),

    body("gender")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isIn(["زن", "مرد"])
      .withMessage("جنسیت وارد شده اشتباه می باشد"),

    body("mobile")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .customSanitizer((phone) => (phone = normalizePhoneNumber(phone)))
      .isMobilePhone("ir-IR")
      .withMessage("شماره موبایل وارد شده معتبر نمی باشد"),

    body("fatherName")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("نام پدر وارد شده معتبر نمی باشد"),

    body("address")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 10, max: 50 })
      .withMessage("آدرس وارد شده معتبر نمی باشد"),

    body("phone")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 9, max: 12 })
      .withMessage("شماره تلفن وارد شده معتبر نمی باشد"),

    body("registerDateShamsi")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ ثبت نام معتبر نمی باشد"),

    body("birthDayShamsi")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ تولد معتبر نمی باشد"),

    body("coach")
      .optional({ nullable: true, checkFalsy: true })
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
      .optional({ nullable: true, checkFalsy: true })
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

    // body("createdBy").optional().isMongoId().withMessage("شناسه ثبت کننده معتبر نمی باشد"),
    // body("imageUrl").string() .error(new Error("تصویر ثبت شده معتبر نمی باشد")),
  ];
}
function StudentRegisterInitialOptionalData() {
  return [
    body("firstName")
      .exists({ checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .escape()
      .isLength({ min: 2, max: 50 })
      .withMessage("نام وارد شده معتبر نمی باشد"),

    body("lastName")
      .exists({ checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("نام خانوادگی وارد شده معتبر نمی باشد"),

    body("nationalID")
      .exists({ checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 10, max: 10 })
      .withMessage("کد ملی وارد شده معتبر نمی باشد"),
  ];
}

function RegisterStudentComplete() {
  return [
    param("id")
      .exists()
      .custom(async (value) => {
        if (isValidObjectId(value)) {
          const checkExistStudent = await StudentModel.findById(value);
          if (!checkExistStudent) {
            throw new Error("هنرجو یافت نشد");
          }
        } else {
          throw new Error("شناسه وارد شده معتبر نمی باشد");
        }
      }),

    body("memberShipValidity")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isInt({ gt: 1370, lt: 1450 })
      .toInt()
      .withMessage("اعتبار عضویت وارد شده معتبر نمی باشد"),

    body("sportsInsuranceDateShamsi")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()

      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ بیمه ورزشی معتبر نمی باشد"),

    body("beltDateShamsi")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ اخذ کمربند معتبر نمی باشد")
      .custom((value, { req }) => {
        if (!req.body?.belt) {
          throw createHttpError.BadRequest("لطفا کمربند خود را وارد کنید");
        }
        return true;
      }),

    body("belt")
      .optional({ nullable: true, checkFalsy: true })
      .custom(async (value, { req }) => {
        if (req.body?.beltDateShamsi) {
          if (isValidObjectId(value)) {
            const checkExistBelt = await BeltModel.findById(value);
            if (!checkExistBelt) {
              throw new Error("کمربند یافت نشد");
            }
          } else {
            throw new Error("شناسه وارد شده معتبر نمی باشد");
          }
        } else {
          throw new Error("لطفا تاریخ کمربند را وارد کنید");
        }
      }),

    // checkExact([
    //   body("beltDateShamsi")
    //     .isString()
    //     .trim()
    //     .notEmpty()
    //     .escape()
    //     .customSanitizer((date) => (date = normalizeCalendar(date)))
    //     .matches(RegExDateShmasi)
    //     .withMessage("تاریخ اخذ کمربند معتبر نمی باشد"),

    //   body("belt").custom(async (value) => {
    //     if (isValidObjectId(value)) {
    //       const checkExistBelt = await BeltModel.findById(value);
    //       if (!checkExistBelt) {
    //         throw new Error("کمربند یافت نشد");
    //       }
    //     } else {
    //       throw new Error("شناسه وارد شده معتبر نمی باشد");
    //     }
    //   }),
    // ]),
  ];
}

module.exports = { StudentRegisterInitialRequiredData, StudentRegisterInitialOptionalData, RegisterStudentComplete };
