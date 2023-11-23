const {
  createBeltExam,
  getBeltExams,
  updateBeltExam,
  getBeltExam,
  removeBeltToBeltExam,
  addBeltToBeltExam,
  removeBeltExam,
} = require("../../controllers/BaseData/beltExamController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");

const beltExamRouter = require("express").Router();

beltExamRouter
  .route("/")
  .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), createBeltExam)
  .get(getBeltExams);
beltExamRouter
  .route("/:id")
  .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), updateBeltExam)
  .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), removeBeltExam)
  .get(getBeltExam);

beltExamRouter.patch("/:id/belt/:beltID/remove", checkPermission([PERMISSIONS.SUPER_ADMIN]), removeBeltToBeltExam);
beltExamRouter.patch("/:id/belt/add", checkPermission([PERMISSIONS.SUPER_ADMIN]), addBeltToBeltExam);

module.exports = { beltExamRouter };
