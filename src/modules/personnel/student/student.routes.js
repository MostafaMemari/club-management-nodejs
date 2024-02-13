const { profileUploader } = require("../../../common/services/uploader/profile.multer");
const studentController = require("./student.controller");
const { StudentRegisterRequiredValidation, StudentRegisterOptionalValidation } = require("./student.validation");

const router = require("express").Router();

// router.post("/register", isAuth, checkPermission(["student"]), uploadMulter.single("image"), studentController.registerStudent);

router.post(
  "/register",
  profileUploader.single("studentProfile"),
  StudentRegisterRequiredValidation(),
  StudentRegisterOptionalValidation(),
  studentController.register
);
router.get("/", studentController.find);
router.get("/:id", studentController.findByID);
router.put("/:id/update-profile", profileUploader.single("studentProfile"), StudentRegisterOptionalValidation(), studentController.update);

// router.post("/login", studentController.loginStudent);
// router.get("/profile", isAuth, checkPermission([PERMISSIONS.STUDENT]), studentController.profileStudent);

// router.route("/:id").put(studentController.updateStudent).get(studentController.getStudent).delete(studentController.deleteStudent);

// router.patch("/:id/belt-upgrade", isAuth, checkPermission([PERMISSIONS.STUDENT]), studentController.upgradeStudentBelt);

// router.route("/").get(isAuth, checkPermission(["student"]), studentController.getStudents);

module.exports = { studentRouter: router };
