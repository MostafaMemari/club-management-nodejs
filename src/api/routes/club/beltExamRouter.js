const {
  createBeltExam,
  updateBeltExam,
  addBeltToBeltExam,
  removeBeltToBeltExam,
  removeBeltExam,
  getBeltExams,
  getBeltExam,
} = require("../../controllers/club/beltExamController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/staff/userModel");

const beltExamRouter = require("express").Router();

beltExamRouter.route("/").post(isAuth(userModel, "Admin"), createBeltExam).get(getBeltExams);
beltExamRouter
  .route("/:id")
  .put(isAuth(userModel, "Admin"), updateBeltExam)
  .delete(isAuth(userModel, "Admin"), removeBeltExam)
  .get(isAuth(userModel, "Admin"), getBeltExam);

beltExamRouter.patch("/:id/belt/:beltID/remove", isAuth(userModel, "Admin"), removeBeltToBeltExam);
beltExamRouter.patch("/:id/belt/add", isAuth(userModel, "Admin"), addBeltToBeltExam);

module.exports = { beltExamRouter };
