const { isAuth } = require("../../../common/middlewares/isAuth");
const PanelController = require("./panel.controller");

const router = require("express").Router();

router.get("/", isAuth, PanelController.main);

router.get("/coach/register", isAuth, PanelController.registerCoach);
router.get("/coachs", isAuth, PanelController.listCoachs);

router.get("/clubs", isAuth, PanelController.listClubs);

router.get("/student/register", isAuth, PanelController.registerStudent);
router.get("/student/update/:id", isAuth, PanelController.updateStudent);
router.get("/students", isAuth, PanelController.listStudent);

module.exports = { PanelRouter: router };
