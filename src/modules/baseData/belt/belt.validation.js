const { body } = require("express-validator");
const { RegExDateShmasi } = require("../../../common/utils/constans");
const { normalizeCalendar } = require("../../../common/utils/normalizeData");
const { BeltModel } = require("./belt.model");
const beltService = require("./belt.service");
const { isValidObjectId } = require("mongoose");
const { removeDuplicatesArray } = require("../../../common/utils/function");

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
      .isString()
      .trim()
      .notEmpty()
      .customSanitizer((duration) => (duration = !isNaN(duration) && Number(duration)))
      .isIn([0, 3, 4, 6, 9, 12, 24, 36, 48, 60, 72, 84, 96, 108])
      .withMessage("دوره زمانی وارد شده معتبر نمی باشد"),

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
          if (isValidObjectId(beltID)) {
            await beltService.checkExistBeltByID(beltID);
          }
        }
        return belts;
      }),
  ];
}

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

module.exports = { BeltValidationOptional, BeltValidationRequired };
