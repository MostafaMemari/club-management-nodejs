const { isAuth } = require("../../common/middlewares/isAuth");
const AuthController = require("./auth.controller");

const router = require("express").Router();

router.post("/user/login", AuthController.userLogin);
router.post("/login", AuthController.login);
router.get("/getme", isAuth, AuthController.getme);

module.exports = { authRouter: router };
