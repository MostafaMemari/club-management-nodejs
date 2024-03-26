const { checkPermission } = require("../../common/guard/permission.guard");
const { profileUploader } = require("../../common/services/uploader/profile.multer");
const { StudentController, StudentControllerForm } = require("./student.controller");
const { StudentValidationRequired, StudentValidationOptional } = require("./student.validation");

const router = require("express").Router();

router.post(
  "/register",
  checkPermission(["student"]),
  profileUploader.single("studentProfile"),
  StudentValidationRequired(),
  StudentValidationOptional(),
  StudentController.register
);
router.get("/", StudentController.find);
router.get("/:id", StudentController.findByID);
router.put("/:id/update-profile", profileUploader.single("studentProfile"), StudentValidationOptional(), StudentController.update);
router.delete("/:id", StudentController.remove);

router.post(
  "/register/form",
  checkPermission(["student"]),
  profileUploader.single("studentProfile"),
  StudentValidationRequired(),
  StudentValidationOptional(),
  StudentControllerForm.register
);

module.exports = { studentRouter: router };
