const { body } = require("express-validator");
const beltService = require("./belt.service");
const { removeDuplicatesArray } = require("../../../common/utils/function");

function BeltValidationRequired() {
  return [
    body("name")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage("کمربند وارد شده معتبر نمی باشد"),

    body("duration")
      .exists({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((duration) => (duration = !isNaN(duration) && Number(duration)))
      .isIn([0, 3, 4, 6, 9, 12, 24, 36, 48, 60, 72, 96, 108])
      .withMessage("دوره زمانی وارد شده معتبر نمی باشد"),
  ];
}

function BeltValidationOptional() {
  return [
    body("name")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .isString()
      .trim()
      .notEmpty()
      .escape()
      .isLength({ min: 2, max: 30 })
      .withMessage("کمربند وارد شده معتبر نمی باشد"),

    body("duration")
      .if((value, { req }) => req.method !== "POST")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .customSanitizer((duration) => (duration = !isNaN(duration) && Number(duration)))
      .isIn([0, 3, 4, 6, 9, 12, 24, 36, 48, 60, 72, 84, 96, 108])
      .withMessage("دوره زمانی وارد شده معتبر نمی باشد"),

    body("underYear")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .notEmpty()
      .customSanitizer((duration) => (duration = !isNaN(duration) && Number(duration)))
      .isIn([14, 15, 16, 18, 21, 22, 25, 30, 36, 44, 53, 60])
      .withMessage("under year is not valid"),

    body("upperYear")
      .optional({ nullable: true, checkFalsy: true })
      .trim()
      .toInt()
      .notEmpty()
      .customSanitizer((duration) => (duration = !isNaN(duration) && Number(duration)))
      .isIn([14, 15, 16, 18, 21, 22, 25, 30, 36, 44, 53, 60])
      .withMessage("upper year is not valid"),

    body("nextBelt")
      .optional({ nullable: true, checkFalsy: true })
      .customSanitizer((belts) => {
        if (Array.isArray(belts)) {
          return belts;
        } else {
          return belts?.split(",");
        }
      })
      .isArray()
      .customSanitizer((belts) => removeDuplicatesArray(belts))
      .custom(async (belts) => {
        for (const beltID of belts) {
          await beltService.checkExistBeltByID(beltID);
        }
      }),
  ];
}

module.exports = { BeltValidationOptional, BeltValidationRequired };
