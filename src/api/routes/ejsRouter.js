const { Router } = require("express");
const { dashboardUserEjs, loginEjs } = require("../controllers/ejsController");
const { isAuth } = require("../middlewares/isAuth");

const router = Router();

router.get("/login", loginEjs);
router.get("/dashboard", isAuth, dashboardUserEjs);

module.exports = {
  ejsRouter: router,
};
