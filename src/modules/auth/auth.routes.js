const AuthController = require("./auth.controller");

const router = require("express").Router();

router.post("/user/login", AuthController.userLogin);
router.post("/login", AuthController.login);

module.exports = { authRouter: router };
