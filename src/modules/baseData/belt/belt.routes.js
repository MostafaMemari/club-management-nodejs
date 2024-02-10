const beltController = require("./belt.controller");
const { BeltValidation } = require("./belt.validation");

const router = require("express").Router();

router.post("/", BeltValidation(), beltController.create);

module.exports = { beltRouter: router };
