const { isAuth } = require("../../../common/middlewares/isAuth");
const PanelController = require("./panel.controller");

const router = require("express").Router();

router.get("/", isAuth, PanelController.main);

router.get("/add-student", isAuth, PanelController.addStudent);

module.exports = { PanelRouter: router };
