const { validate } = require("../../../common/middlewares/validateExpressValidator");
const { profileUploader } = require("../../../common/services/uploader/profile.multer");
const studentController = require("./student.controller");
const { optionalStudentValidate, requiredStudentValidate, requiredInitialStudentRegister, optionalInitialStudentRegister } = require("./student.validation");

const router = require("express").Router();

// router.post("/register", isAuth, checkPermission(["student"]), uploadMulter.single("image"), studentController.registerStudent);

router.post(
  "/initial/register",
  profileUploader.single("studentProfile"),
  requiredInitialStudentRegister(),
  optionalInitialStudentRegister(),
  studentController.register
);
router.put("/:id/initial/register", profileUploader.single("studentProfile"), optionalInitialStudentRegister(), studentController.register);

router.post("/complete/register", requiredInitialStudentRegister(), optionalInitialStudentRegister(), studentController.register);
router.put("/:id/complete/register", optionalInitialStudentRegister(), studentController.register);

// router.post("/login", studentController.loginStudent);
// router.get("/profile", isAuth, checkPermission([PERMISSIONS.STUDENT]), studentController.profileStudent);

// router.route("/:id").put(studentController.updateStudent).get(studentController.getStudent).delete(studentController.deleteStudent);

// router.patch("/:id/belt-upgrade", isAuth, checkPermission([PERMISSIONS.STUDENT]), studentController.upgradeStudentBelt);

// router.route("/").get(isAuth, checkPermission(["student"]), studentController.getStudents);

module.exports = { studentRouter: router };
