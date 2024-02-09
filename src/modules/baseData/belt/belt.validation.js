const { body } = require("express-validator");
const { RegExDateShmasi } = require("../../../common/utils/constans");
const { normalizeCalendar } = require("../../../common/utils/normalizeData");

function BeltValidation() {
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
      .isIn([0, 3, 4, 6, 9, 12, 24, 36, 48, 60, 72, 84, 96, 108])
      .withMessage("دوره زمانی وارد شده معتبر نمی باشد"),
  ];
}

module.exports = { BeltValidation };
