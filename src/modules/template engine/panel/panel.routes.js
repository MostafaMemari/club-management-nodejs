const { isAuth } = require("../../../common/middlewares/isAuth");
const { AdminRouter } = require("./admin/admin.routes");
const PanelController = require("./panel.controller");

const router = require("express").Router();

router.get("/", isAuth, PanelController.main);

router.use("/", isAuth, AdminRouter);

module.exports = { PanelRouter: router };
