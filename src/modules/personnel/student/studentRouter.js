const studentController = require("../../controllers/Personnel/studentController");
const { PERMISSIONS } = require("../../../api/helpers/constans");
const { advancedResult } = require("../../../api/middlewares/advancedResult");
const { isAuth } = require("../../../api/middlewares/isAuth");
const { checkPermission } = require("../../../api/middlewares/permission.guard");
const { uploadMulter } = require("../../../api/services/multer");

const studentRouter = require("express").Router();

studentRouter.post("/register", isAuth, checkPermission(["student"]), uploadMulter.single("image"), studentController.registerStudent);
studentRouter.post("/login", studentController.loginStudent);
studentRouter.get("/profile", isAuth, checkPermission([PERMISSIONS.STUDENT]), studentController.profileStudent);

studentRouter.route("/:id").put(studentController.updateStudent).get(studentController.getStudent).delete(studentController.deleteStudent);

studentRouter.patch("/:id/belt-upgrade", isAuth, checkPermission([PERMISSIONS.STUDENT]), studentController.upgradeStudentBelt);

studentRouter.route("/").get(isAuth, checkPermission(["student"]), studentController.getStudents);

module.exports = { studentRouter };
