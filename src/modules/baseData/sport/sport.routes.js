const sportController = require("./sport.controller");
const { SportValidation } = require("./sport.validation");

const router = require("express").Router();

router.post("/", SportValidation(), sportController.create);

module.exports = { sportRouter: router };
