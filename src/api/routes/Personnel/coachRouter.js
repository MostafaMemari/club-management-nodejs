const {
  getCoachs,
  updateCoach,
  registerCoach,
  getCoach,
  deleteCoach,
  loginCoach,
  profileCoach,
} = require("../../controllers/Personnel/coachController");
const { PERMISSIONS } = require("../../helpers/constans");
const { isAuth } = require("../../middlewares/isAuth");
const { checkPermission } = require("../../middlewares/permission.guard");
const { uploadMulter } = require("../../services/multer");

const coachRouter = require("express").Router();

coachRouter.post("/register", uploadMulter.single("image"), registerCoach);
coachRouter.post("/login", loginCoach);
coachRouter.get("/profile", isAuth, profileCoach);

coachRouter.route("/:id").put(uploadMulter.single("image"), updateCoach).delete(deleteCoach).get(getCoach);
coachRouter.route("/").get(getCoachs);

coachRouter;

module.exports = { coachRouter };
