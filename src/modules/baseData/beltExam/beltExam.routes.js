const BeltExamController = require("./beltExam.controller");
const { BeltExamValidationRequired, BeltExamValidationOptional } = require("./beltExam.validation");

const router = require("express").Router();

router.post("/", BeltExamValidationRequired(), BeltExamValidationOptional(), BeltExamController.create);
router.get("/", BeltExamController.find);

router.put("/:id", BeltExamValidationOptional(), BeltExamController.update);
router.get("/:id", BeltExamController.findByID);
router.delete("/:id", BeltExamController.remove);

module.exports = { beltExamRouter: router };
