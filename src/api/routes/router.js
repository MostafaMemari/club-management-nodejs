const { ageGroupRouter } = require("./Admin/baseData/ageGroupRouter.js");
const { beltExamFedRouter } = require("./Admin/baseData/beltExamRouter.js");
const { beltRouter } = require("./Admin/baseData/beltRouter.js");
const { sportRouter } = require("./Admin/baseData/sportRouter.js");
const { userRouter } = require("./Admin/userRouter");
const { clubRouter } = require("./management/clubRouter");
const { coachRouter } = require("./management/coachRouter");
const { studentRouter } = require("./management/studentRouter");

const router = require("express").Router();

router.use("/api/v1/users", userRouter);
router.use("/api/v1/coachs", coachRouter);
router.use("/api/v1/students", studentRouter);

router.use("/api/v1/clubs", clubRouter);
router.use("/api/v1/sports", sportRouter);
router.use("/api/v1/ages", ageGroupRouter);
router.use("/api/v1/belts", beltRouter);
router.use("/api/v1/belt-exams", beltExamFedRouter);

// router.get("/api/v1/test", insertStudetnsJSON);

module.exports = {
  AllRouter: router,
};
