const { isAuth } = require("../../common/middlewares/isAuth");
const { AuthController, AuthControllerForm } = require("./auth.controller");

const router = require("express").Router();

router.post("/user/login", AuthController.userLogin);
router.post("/login", AuthController.login);
router.get("/getme", isAuth, AuthController.getme);

router.post("/user/login/form", AuthControllerForm.userLogin);
router.post("/login/form", AuthControllerForm.login);

module.exports = { authRouter: router };
