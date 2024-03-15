const { isAuth } = require("../../common/middlewares/isAuth");
const AuthController = require("./auth.controller");

const router = require("express").Router();

router.post("/user/login", AuthController.userLogin);
router.post("/user/login/form", AuthController.userLoginForm);

router.post("/login", AuthController.login);
router.post("/login/form", AuthController.loginForm);

router.get("/getme", isAuth, AuthController.getme);

module.exports = { authRouter: router };
