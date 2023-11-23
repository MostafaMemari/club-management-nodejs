const { getCoachs, updateCoach, registerCoach, getCoach, deleteCoach } = require("../../controllers/Personnel/coachController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");
const { uploadMulter } = require("../../services/multer");

const coachRouter = require("express").Router();

coachRouter.route("/:id").put(uploadMulter.single("image"), updateCoach).delete(deleteCoach).get(getCoach);
coachRouter.route("/").post(uploadMulter.single("image"), registerCoach).get(getCoachs);

coachRouter;

module.exports = { coachRouter };
