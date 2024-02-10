const beltExamController = require("./beltExam.controller");
const { BeltExamValidation } = require("./beltExam.validation");

const router = require("express").Router();

router.post("/", BeltExamValidation(), beltExamController.create);

module.exports = { beltExamRouter: router };
