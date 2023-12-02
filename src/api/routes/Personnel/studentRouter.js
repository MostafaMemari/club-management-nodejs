const studentController = require("../../controllers/Personnel/studentController");
const { PERMISSIONS } = require("../../helpers/constans");
const { advancedResult } = require("../../middlewares/advancedResult");
const { isAuth } = require("../../middlewares/isAuth");
const { checkPermission } = require("../../middlewares/permission.guard");
const { uploadMulter } = require("../../services/multer");

const studentRouter = require("express").Router();

studentRouter.post("/register", isAuth, checkPermission(["student"]), uploadMulter.single("image"), studentController.registerStudent);
studentRouter.post("/login", studentController.loginStudent);
studentRouter.get("/profile", isAuth, checkPermission([PERMISSIONS.STUDENT]), studentController.profileStudent);

studentRouter.route("/:id").put(studentController.updateStudent).get(studentController.getStudent).delete(studentController.deleteStudent);

studentRouter.patch("/:id/belt-upgrade", isAuth, checkPermission([PERMISSIONS.STUDENT]), studentController.upgradeStudentBelt);

studentRouter.route("/").get(isAuth, checkPermission(["student"]), studentController.getStudents);

module.exports = { studentRouter };
