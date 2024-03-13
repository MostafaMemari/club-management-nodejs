const AuthController = require("../auth/auth.controller");

const router = require("express").Router();

router.get("/login", AuthController.login);
router.get("/student/login", AuthController.studentLogin);

module.exports = { AuthRouter: router };
