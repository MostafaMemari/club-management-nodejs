const {
  getStudents,
  updateStudent,
  getStudent,
  deleteStudent,
  registerStudent,
  profileStudent,
  loginStudent,
  upgradeStudentBelt,
} = require("../../controllers/Personnel/studentController");
const { PERMISSIONS } = require("../../helpers/constans");
const { advancedResult } = require("../../middlewares/advancedResult");
const { isAuth } = require("../../middlewares/isAuth");
const { checkPermission } = require("../../middlewares/permission.guard");
const { uploadMulter } = require("../../services/multer");

const studentRouter = require("express").Router();

studentRouter.post("/register", isAuth, checkPermission(["student"]), uploadMulter.single("image"), registerStudent);
studentRouter.post("/login", loginStudent);
studentRouter.get("/profile", isAuth, checkPermission([PERMISSIONS.STUDENT]), profileStudent);

studentRouter.route("/:id").put(updateStudent).get(getStudent).delete(deleteStudent);

studentRouter.patch("/:id/belt-upgrade", isAuth, checkPermission([PERMISSIONS.STUDENT]), upgradeStudentBelt);

studentRouter.route("/").get(isAuth, checkPermission(["student"]), getStudents);

studentRouter;

module.exports = { studentRouter };
