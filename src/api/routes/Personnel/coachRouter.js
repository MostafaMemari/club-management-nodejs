const { getCoachs, updateCoach, registerCoach, getCoach, deleteCoach, loginCoach } = require("../../controllers/Personnel/coachController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");
const { uploadMulter } = require("../../services/multer");

const coachRouter = require("express").Router();

coachRouter.post("/register", uploadMulter.single("image"), registerCoach);
coachRouter.post("/login", loginCoach);

coachRouter.route("/:id").put(uploadMulter.single("image"), updateCoach).delete(deleteCoach).get(getCoach);
coachRouter.route("/").get(getCoachs);

coachRouter;

module.exports = { coachRouter };
