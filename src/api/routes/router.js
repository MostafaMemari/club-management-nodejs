const { insertStudetnsJSON } = require("../controllers/testController.js");
const { PERMISSIONS } = require("../helpers/constans.js");
const { isAuth } = require("../middlewares/isAuth.js");
const { checkPermission } = require("../middlewares/permission.guard.js");
const { ageGroupRouter } = require("./BaseData/ageGroupRouter.js");
const { beltExamRouter } = require("./BaseData/beltExamRouter.js");
const { beltRouter } = require("./BaseData/beltRouter.js");
const { sportRouter } = require("./BaseData/sportRouter.js");
const { clubRouter } = require("./Management/clubRouter.js");
const { coachRouter } = require("./Personnel/coachRouter.js");
const { studentRouter } = require("./Personnel/studentRouter.js");
const { userRouter } = require("./Personnel/userRouter.js");
const { permissionRouter } = require("./RBAC/permissionRouter.js");
const { roleRouter } = require("./RBAC/roleRouter.js");
const { ejsRouter } = require("./ejsRouter.js");

const router = require("express").Router();

// EJS
router.use("/", ejsRouter);

// Personel
router.use("/api/v1/users", userRouter);
router.use("/api/v1/coachs", coachRouter);
router.use("/api/v1/students", studentRouter);

// Management
router.use("/api/v1/clubs", isAuth, clubRouter);

// BASE DATA
router.use("/api/v1/sports", isAuth, sportRouter);
router.use("/api/v1/ages", isAuth, ageGroupRouter);
router.use("/api/v1/belts", isAuth, beltRouter);
router.use("/api/v1/belt-exams", isAuth, beltExamRouter);

// RBAC
router.use("/api/v1/roles", isAuth, checkPermission([PERMISSIONS.SUPER_ADMIN]), roleRouter);
router.use("/api/v1/permissions", isAuth, checkPermission([PERMISSIONS.SUPER_ADMIN]), permissionRouter);

router.get("/api/v1/test", insertStudetnsJSON);

module.exports = {
  AllRouter: router,
};
