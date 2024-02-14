const BeltController = require("./belt.controller");
const { BeltValidationOptional, BeltValidationRequired } = require("./belt.validation");

const router = require("express").Router();

router.post("/", BeltValidationRequired(), BeltValidationOptional(), BeltController.create);
router.get("/", BeltController.find);

router.put("/:id", BeltValidationOptional(), BeltController.update);
router.get("/:id", BeltController.findByID);
router.delete("/:id", BeltController.remove);

module.exports = { beltRouter: router };
