const { ageGroupRouter } = require("./baseData/ageGroup/ageGroup.routes.js");
const { beltRouter } = require("./baseData/belt/belt.routes.js");
const { studentRouter } = require("./personnel/student/student.routes.js");

const router = require("express").Router();

// EJS
// router.use("/", ejsRouter);

// Personel
// router.use("/api/v1/users", userRouter);
// router.use("/api/v1/coachs", coachRouter);
router.use("/students", studentRouter);

// Management
// router.use("/api/v1/clubs", isAuth, clubRouter);

// BASE DATA
// router.use("/api/v1/sports", isAuth, sportRouter);
router.use("/ages", ageGroupRouter);
router.use("/belts", beltRouter);
// router.use("/api/v1/belt-exams", isAuth, beltExamRouter);
// router.use("/api/v1/weights", isAuth, weightRouter);

// RBAC
// router.use("/api/v1/roles", isAuth, checkPermission([PERMISSIONS.SUPER_ADMIN]), roleRouter);
// router.use("/api/v1/permissions", isAuth, checkPermission([PERMISSIONS.SUPER_ADMIN]), permissionRouter);

// router.get("/api/v1/test", insertStudetnsJSON);

module.exports = {
  AllRouter: router,
};
