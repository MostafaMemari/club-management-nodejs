const StudentController = require("./student.controller");

const router = require("express").Router();

router.get("/register", StudentController.register);
router.get("/list", StudentController.list);

module.exports = { StudentRouter: router };
