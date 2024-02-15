const { profileUploader } = require("../../common/services/uploader/profile.multer");
const CoachController = require("./coach.controller");
const { CoachValidationRequired, CoachValidationOptional } = require("./coach.validation");

const router = require("express").Router();

router.post("/register", profileUploader.single("coachProfile"), CoachValidationRequired(), CoachValidationOptional(), CoachController.register);
router.get("/", CoachController.find);
router.get("/:id", CoachController.findByID);
router.put("/:id/update-profile", profileUploader.single("coachProfile"), CoachValidationOptional(), CoachController.update);
router.delete("/:id", CoachController.remove);

module.exports = { coachRouter: router };
