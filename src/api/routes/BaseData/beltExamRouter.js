const beltExamController = require("../../controllers/BaseData/beltExamController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");

const beltExamRouter = require("express").Router();

beltExamRouter
  .route("/")
  .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), beltExamController.createBeltExam)
  .get(beltExamController.getBeltExams);
beltExamRouter
  .route("/:id")
  .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), beltExamController.updateBeltExam)
  .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), beltExamController.removeBeltExam)
  .get(beltExamController.getBeltExam);

beltExamRouter.patch("/:id/belt/:beltID/remove", checkPermission([PERMISSIONS.SUPER_ADMIN]), beltExamController.removeBeltToBeltExam);
beltExamRouter.patch("/:id/belt/add", checkPermission([PERMISSIONS.SUPER_ADMIN]), beltExamController.addBeltToBeltExam);

module.exports = { beltExamRouter };
