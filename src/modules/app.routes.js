const { ageGroupRouter } = require("./baseData/ageGroup/ageGroup.routes.js");
const { beltRouter } = require("./baseData/belt/belt.routes.js");
const { beltExamRouter } = require("./baseData/beltExam/beltExam.routes.js");
const { sportRouter } = require("./baseData/sport/sport.routes.js");
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
router.use("/sports", sportRouter);
router.use("/ages", ageGroupRouter);
router.use("/belts", beltRouter);
router.use("/belt-exams", beltExamRouter);
// router.use("/api/v1/weights", isAuth, weightRouter);

// RBAC
// router.use("/api/v1/roles", isAuth, checkPermission([PERMISSIONS.SUPER_ADMIN]), roleRouter);
// router.use("/api/v1/permissions", isAuth, checkPermission([PERMISSIONS.SUPER_ADMIN]), permissionRouter);

// router.get("/api/v1/test", insertStudetnsJSON);

module.exports = {
  AllRouter: router,
};
