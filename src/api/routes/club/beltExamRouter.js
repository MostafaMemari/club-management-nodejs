const { createBeltExam, updateBeltExam, addBeltToBeltExam, removeBeltToBeltExam } = require("../../controllers/club/beltExamController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/staff/userModel");

const beltExamRouter = require("express").Router();

beltExamRouter.post("/", createBeltExam);

beltExamRouter.patch("/:id/belt/:beltID/remove", isAuth(userModel, "Admin"), removeBeltToBeltExam);
beltExamRouter.patch("/:id/belt/add", isAuth(userModel, "Admin"), addBeltToBeltExam);

beltExamRouter.route("/:id").put(isAuth(userModel, "Admin"), updateBeltExam);

module.exports = { beltExamRouter };
