const studentController = require("./student.controller");

const router = require("express").Router();

router.get("/register", studentController.register);
// router.get("/list", studentController.list);

module.exports = { StudentRouter: router };
