const PanelController = require("./panel.controller");

const router = require("express").Router();

router.get("/test", PanelController.main);

module.exports = { PanelRouter: router };
