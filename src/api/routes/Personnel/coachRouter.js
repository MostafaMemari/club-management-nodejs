const coachController = require("../../controllers/Personnel/coachController");
const { PERMISSIONS } = require("../../helpers/constans");
const { isAuth } = require("../../middlewares/isAuth");
const { checkPermission } = require("../../middlewares/permission.guard");
const { uploadMulter } = require("../../services/multer");

const coachRouter = require("express").Router();

coachRouter.post("/register", uploadMulter.single("image"), coachController.registerCoach);
coachRouter.post("/login", coachController.loginCoach);
coachRouter.get("/profile", isAuth, coachController.profileCoach);

coachRouter
  .route("/:id")
  .put(uploadMulter.single("image"), coachController.updateCoach)
  .delete(coachController.deleteCoach)
  .get(coachController.getCoach);
coachRouter.route("/").get(coachController.getCoachs);

module.exports = { coachRouter };
