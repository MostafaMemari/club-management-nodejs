const { registerCoach, updateCoach, getCoachs, getCoach, deleteCoach } = require("../../controllers/staff/coachController");
const { uploadMulter } = require("../../services/multer");

const coachRouter = require("express").Router();

coachRouter.route("/:id/admin").put(uploadMulter.single("image"), updateCoach).get(getCoach).delete(deleteCoach);
coachRouter.get("/admin", getCoachs);

coachRouter.post("/admin/register", uploadMulter.single("image"), registerCoach);

module.exports = { coachRouter };
