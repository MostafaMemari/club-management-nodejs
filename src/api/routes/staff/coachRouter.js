const { registerCoach } = require("../../controllers/staff/coachController");
const { uploadMulter } = require("../../services/multer");

const coachRouter = require("express").Router();

coachRouter.post("/admin/register", uploadMulter.single("image"), registerCoach);

module.exports = { coachRouter };
