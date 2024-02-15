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

// EJS
// router.use("/", ejsRouter);

router.use("/auth", authRouter);

// Personel
router.use("/users", userRouter);
router.use("/coachs", coachRouter);
router.use("/students", studentRouter);

// Management
router.use("/clubs", clubRouter);

// BASE DATA
router.use("/sports", sportRouter);
router.use("/ages", ageGroupRouter);
router.use("/belts", beltRouter);
router.use("/belt-exams", beltExamRouter);
// router.use("/api/v1/weights", isAuth, weightRouter);

// RBAC
router.use("/roles", roleRouter);
router.use("/permissions", permissionRouter);

// router.get("/api/v1/test", insertStudetnsJSON);

module.exports = {
  AllRouter: router,
};
