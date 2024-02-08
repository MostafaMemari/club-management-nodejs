const { validate } = require("../../../common/middlewares/validateExpressValidator");
const { profileUploader } = require("../../../common/services/uploader/profile.multer");
const studentController = require("./student.controller");
const { optionalStudentValidate, requiredStudentValidate } = require("./student.validation");

const router = require("express").Router();

// router.post("/register", isAuth, checkPermission(["student"]), uploadMulter.single("image"), studentController.registerStudent);

router.post("/", profileUploader.single("studentProfile"), optionalStudentValidate(), requiredStudentValidate(), studentController.register);
router.put("/:id", profileUploader.single("studentProfile"), optionalStudentValidate(), studentController.register);

// router.post("/login", studentController.loginStudent);
// router.get("/profile", isAuth, checkPermission([PERMISSIONS.STUDENT]), studentController.profileStudent);

// router.route("/:id").put(studentController.updateStudent).get(studentController.getStudent).delete(studentController.deleteStudent);

// router.patch("/:id/belt-upgrade", isAuth, checkPermission([PERMISSIONS.STUDENT]), studentController.upgradeStudentBelt);

// router.route("/").get(isAuth, checkPermission(["student"]), studentController.getStudents);

module.exports = { studentRouter: router };
