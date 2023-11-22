const { ageGroupRouter } = require("./BaseData/ageGroupRouter.js");
const { beltExamRouter } = require("./BaseData/beltExamRouter.js");
const { beltRouter } = require("./BaseData/beltRouter.js");
const { sportRouter } = require("./BaseData/sportRouter.js");
const { clubRouter } = require("./Management/clubRouter.js");
const { coachRouter } = require("./Personnel/coachRouter.js");
const { studentRouter } = require("./Personnel/studentRouter");
const { userRouter } = require("./Personnel/userRouter");
const { permissionRouter } = require("./RBAC/permissionRouter.js");
const { roleRouter } = require("./RBAC/roleRouter.js");

const router = require("express").Router();

router.use("/api/v1/users", userRouter);
router.use("/api/v1/coachs", coachRouter);
router.use("/api/v1/students", studentRouter);

// RBAC
router.use("/api/v1/roles", roleRouter);
router.use("/api/v1/permissions", permissionRouter);

router.use("/api/v1/clubs", clubRouter);
router.use("/api/v1/sports", sportRouter);
router.use("/api/v1/ages", ageGroupRouter);
router.use("/api/v1/belts", beltRouter);
router.use("/api/v1/belt-exams", beltExamRouter);

// router.get("/api/v1/test", insertStudetnsJSON);

module.exports = {
  AllRouter: router,
};
