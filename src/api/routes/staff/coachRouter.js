const { registerCoach } = require("../../controllers/staff/coachController");

const coachRouter = require("express").Router();

coachRouter.post("/admin/register", registerCoach);

module.exports = { coachRouter };
