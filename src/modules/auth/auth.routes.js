const AuthController = require("./auth.controller");

const router = require("express").Router();

router.post("/user/login", AuthController.userLogin);
router.post("/student/login", AuthController.studentLogin);

module.exports = { authRouter: router };
