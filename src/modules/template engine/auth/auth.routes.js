const AuthController = require("../auth/auth.controller");

const router = require("express").Router();

router.get("/login", AuthController.login);
router.get("/studnet/login", AuthController.studentLogin);

module.exports = { AuthRouter: router };
