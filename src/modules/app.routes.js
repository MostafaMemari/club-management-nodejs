const { checkPermission } = require("../common/guard/permission.guard.js");
const { isAuth } = require("../common/middlewares/isAuth.js");
const { PERMISSIONS } = require("../common/constant/RBAC.js");
const { permissionRouter } = require("./RBAC/permission/permission.routes.js");
const { roleRouter } = require("./RBAC/role/role.routes.js");
const { authRouter } = require("./auth/auth.routes.js");
const { ageGroupRouter } = require("./baseData/ageGroup/ageGroup.routes.js");
const { beltRouter } = require("./baseData/belt/belt.routes.js");
const { beltExamRouter } = require("./baseData/beltExam/beltExam.routes.js");
const { sportRouter } = require("./baseData/sport/sport.routes.js");
const { clubRouter } = require("./club/club.routes.js");
const { coachRouter } = require("./coach/coach.routes.js");
const { studentRouter } = require("./student/student.routes.js");
const { userRouter } = require("./user/user.routes.js");

const router = require("express").Router();

router.use("/auth", authRouter);

// Personel
router.use("/users", isAuth, checkPermission(["SUPER_ADMIN"]), userRouter);

router.use("/coachs", isAuth, checkPermission(["coach"]), coachRouter);
router.use("/students", isAuth, studentRouter);

// Management
// router.use("/clubs", isAuth, checkPermission(["club"]), clubRouter);
router.use("/clubs", isAuth, clubRouter);

// BASE DATA
router.use("/sports", isAuth, checkPermission(["SUPER_ADMIN"]), sportRouter);
router.use("/ages", isAuth, checkPermission(["SUPER_ADMIN"]), ageGroupRouter);
router.use("/belts", isAuth, checkPermission(["SUPER_ADMIN"]), beltRouter);
// router.use("/belt-exams", isAuth, checkPermission(["SUPER_ADMIN"]), beltExamRouter);
router.use("/belt-exams", beltExamRouter);
// router.use("/api/v1/weights",  weightRouter);

// RBAC
router.use("/roles", isAuth, checkPermission(["SUPER_ADMIN"]), roleRouter);
router.use("/permissions", isAuth, checkPermission(["SUPER_ADMIN"]), permissionRouter);

module.exports = {
  AllRouter: router,
};
