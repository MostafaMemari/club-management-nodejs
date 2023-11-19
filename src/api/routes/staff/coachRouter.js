const { registerCoach, updateCoach } = require("../../controllers/staff/coachController");
const { uploadMulter } = require("../../services/multer");

const coachRouter = require("express").Router();

coachRouter.put("/:id/admin/update", uploadMulter.single("image"), updateCoach);

coachRouter.post("/admin/register", uploadMulter.single("image"), registerCoach);

module.exports = { coachRouter };
