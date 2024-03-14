const AdminController = require("./admin.controller");

const router = require("express").Router();

router.get("/student/register", AdminController.registerStudent);
router.get("/student/list", AdminController.listStudent);

module.exports = { AdminRouter: router };
