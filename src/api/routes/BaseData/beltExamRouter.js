const {
  createBeltExam,
  getBeltExams,
  updateBeltExam,
  getBeltExam,
  removeBeltToBeltExam,
  addBeltToBeltExam,
  removeBeltExam,
} = require("../../controllers/BaseData/beltExamController");

const beltExamRouter = require("express").Router();

beltExamRouter.route("/").post(createBeltExam).get(getBeltExams);
beltExamRouter.route("/:id").put(updateBeltExam).delete(removeBeltExam).get(getBeltExam);

beltExamRouter.patch("/:id/belt/:beltID/remove", removeBeltToBeltExam);
beltExamRouter.patch("/:id/belt/add", addBeltToBeltExam);

module.exports = { beltExamRouter };
