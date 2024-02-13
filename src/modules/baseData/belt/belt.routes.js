const BeltController = require("./belt.controller");
const { BeltValidationOptional, BeltValidationRequired } = require("./belt.validation");

const router = require("express").Router();

router.post("/", BeltValidationRequired(), BeltValidationOptional(), BeltController.create);
router.put("/:id", BeltValidationOptional(), BeltController.update);
router.get("/", BeltController.find);

module.exports = { beltRouter: router };
