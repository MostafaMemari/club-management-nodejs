const { createBeltExam } = require("../../controllers/club/beltExamController");

const beltExamRouter = require("express").Router();

beltExamRouter.post("/", createBeltExam);

module.exports = { beltExamRouter };
