const {
  createBeltExam,
  getBeltExams,
  updateBeltExam,
  removeBeltExam,
  getBeltExam,
  removeBeltToBeltExam,
  addBeltToBeltExam,
} = require("../../../controllers/Admin/baseData/beltExamController");
const { isAuth } = require("../../../middlewares/isAuth");
const { userModel } = require("../../../models/admin/userModel");

const beltExamFedRouter = require("express").Router();

beltExamFedRouter.route("/").post(isAuth(userModel, "SUPER_ADMIN"), createBeltExam).get(isAuth(userModel, "SUPER_ADMIN"), getBeltExams);
beltExamFedRouter
  .route("/:id")
  .put(isAuth(userModel, "SUPER_ADMIN"), updateBeltExam)
  .delete(isAuth(userModel, "SUPER_ADMIN"), removeBeltExam)
  .get(isAuth(userModel, "SUPER_ADMIN"), getBeltExam);

beltExamFedRouter.patch("/:id/belt/:beltID/remove", isAuth(userModel, "SUPER_ADMIN"), removeBeltToBeltExam);
beltExamFedRouter.patch("/:id/belt/add", isAuth(userModel, "SUPER_ADMIN"), addBeltToBeltExam);

module.exports = { beltExamFedRouter };
