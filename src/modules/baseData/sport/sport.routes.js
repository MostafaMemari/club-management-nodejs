const SportController = require("./sport.controller");
const { SportValidation } = require("./sport.validation");

const router = require("express").Router();

router.post("/", SportValidation(), SportController.create);
router.get("/", SportController.find);

module.exports = { sportRouter: router };
