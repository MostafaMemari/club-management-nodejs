const { isAuth } = require("../../../common/middlewares/isAuth");
const PanelController = require("./panel.controller");
const { StudentRouter } = require("./student/student.routes");

const router = require("express").Router();

router.get("/", isAuth, PanelController.main);

router.use("/student", isAuth, StudentRouter);

module.exports = { PanelRouter: router };
