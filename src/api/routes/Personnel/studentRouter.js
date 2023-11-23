const {
  getStudents,
  updateStudent,
  getStudent,
  deleteStudent,
  registerStudent,
  profileStudent,
} = require("../../controllers/Personnel/studentController");
const { PERMISSIONS } = require("../../helpers/constans");
const { advancedResult } = require("../../middlewares/advancedResult");
const { checkPermission } = require("../../middlewares/permission.guard");
const { uploadMulter } = require("../../services/multer");

const studentRouter = require("express").Router();

studentRouter
  .route("/")
  .post(uploadMulter.single("image"), registerStudent)
  .get(checkPermission([PERMISSIONS.COACH]), getStudents);

studentRouter.get("/profile", checkPermission([PERMISSIONS.STUDENT]), profileStudent);

studentRouter.route("/:id").put(updateStudent).get(getStudent).delete(deleteStudent);

studentRouter;

module.exports = { studentRouter };
