const { ageGroupRouter } = require("./club/ageGroupRouter.js");
const { beltExamRouter } = require("./club/beltExamRouter.js");
const { beltRouter } = require("./club/beltRouter.js");
const { clubRouter } = require("./club/clubRouter");
const { sportRouter } = require("./club/sportRouter.js");
const { coachRouter } = require("./staff/coachRouter.js");
const { studentRouter } = require("./staff/studentRouter.js");
const { userRouter } = require("./staff/userRouter");

const router = require("express").Router();

router.use("/api/v1/users", userRouter);
router.use("/api/v1/coachs", coachRouter);
router.use("/api/v1/students", studentRouter);
router.use("/api/v1/clubs", clubRouter);
router.use("/api/v1/sports", sportRouter);
router.use("/api/v1/ages", ageGroupRouter);
router.use("/api/v1/belts", beltRouter);
router.use("/api/v1/belt-exams", beltExamRouter);

module.exports = {
  AllRouter: router,
};
