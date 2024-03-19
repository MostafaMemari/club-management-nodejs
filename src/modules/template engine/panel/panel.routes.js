const { isAuth } = require("../../../common/middlewares/isAuth");
const PanelController = require("./panel.controller");

const router = require("express").Router();

router.get("/", isAuth, PanelController.main);

router.get("/coach/register", isAuth, PanelController.registerCoach);

router.get("/clubs", isAuth, PanelController.listClubs);

router.get("/student/register", isAuth, PanelController.registerStudent);
router.get("/student/list", isAuth, PanelController.listStudent);

module.exports = { PanelRouter: router };
