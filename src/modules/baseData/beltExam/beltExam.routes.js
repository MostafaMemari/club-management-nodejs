const BeltExamController = require("./beltExam.controller");
const { BeltExamValidation } = require("./beltExam.validation");

const router = require("express").Router();

router.post("/", BeltExamValidation(), BeltExamController.create);
router.get("/", BeltExamController.find);

module.exports = { beltExamRouter: router };
