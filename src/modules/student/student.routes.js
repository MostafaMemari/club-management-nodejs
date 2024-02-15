const { profileUploader } = require("../../common/services/uploader/profile.multer");
const StudentController = require("./student.controller");
const { StudentValidationRequired, StudentValidationOptional } = require("./student.validation");

const router = require("express").Router();

router.post("/register", profileUploader.single("studentProfile"), StudentValidationRequired(), StudentValidationOptional(), StudentController.register);
router.get("/", StudentController.find);
router.get("/:id", StudentController.findByID);
router.put("/:id/update-profile", profileUploader.single("studentProfile"), StudentValidationOptional(), StudentController.update);
router.delete("/:id", StudentController.remove);

// router.post("/register", isAuth, checkPermission(["student"]), uploadMulter.single("image"), StudentController.registerStudent);
// router.post("/login", StudentController.loginStudent);
// router.get("/profile", isAuth, checkPermission([PERMISSIONS.STUDENT]), StudentController.profileStudent);
// router.route("/:id").put(StudentController.updateStudent).get(StudentController.getStudent).delete(StudentController.deleteStudent);
// router.patch("/:id/belt-upgrade", isAuth, checkPermission([PERMISSIONS.STUDENT]), StudentController.upgradeStudentBelt);
// router.route("/").get(isAuth, checkPermission(["student"]), StudentController.getStudents);

module.exports = { studentRouter: router };
