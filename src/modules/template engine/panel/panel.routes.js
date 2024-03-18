const { isAuth } = require("../../../common/middlewares/isAuth");
const PanelController = require("./panel.controller");

const router = require("express").Router();

router.get("/", isAuth, PanelController.main);

router.get("/coach/register", PanelController.registerCoach);

router.get("/clubs", PanelController.listClubs);

router.get("/student/register", PanelController.registerStudent);
router.get("/student/list", PanelController.listStudent);

module.exports = { PanelRouter: router };
