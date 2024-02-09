const { body } = require("express-validator");
const { isValidObjectId } = require("mongoose");
const { AgeGroupModel } = require("./ageGroup.model");
const { RegExDateShmasi } = require("../../../common/utils/constans");
const { normalizeCalendar } = require("../../../common/utils/normalizeData");

function AgeGroupValidation() {
  return [
    body("name")
      .exists({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .isString()
      .escape()
      .isLength({ min: 2, max: 50 })
      .custom(async (name) => {
        const checkExistNameAgeGroup = await AgeGroupModel.findOne({ name }).lean();
        if (checkExistNameAgeGroup) {
          throw new Error("رده سنی وارد شده تکراری می باشد");
        }
      })
      .withMessage("رده سنی وارد شده معتبر نمی باشد"),

    body("description")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .escape()
      .isString()
      .isLength({ min: 2, max: 50 })
      .withMessage("توضیحات رده سنی معتبر نمی باشد"),

    body("fromDate")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ شروع رده سنی معتبر نمی باشد"),

    body("toDate")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((date) => (date = normalizeCalendar(date)))
      .matches(RegExDateShmasi)
      .withMessage("تاریخ پایان رده سنی معتبر نمی باشد"),
  ];
}

module.exports = { AgeGroupValidation };
