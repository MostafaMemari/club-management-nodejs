const BeltController = require("./belt.controller");
const { BeltValidation } = require("./belt.validation");

const router = require("express").Router();

router.post("/", BeltValidation(), BeltController.create);
router.get("/", BeltController.find);

module.exports = { beltRouter: router };
