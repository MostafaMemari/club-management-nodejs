const UserController = require("./user.controller");
const { UserValidationRequired, UserValidationOptional } = require("./user.validation");

const router = require("express").Router();

router.post("/register", UserValidationRequired(), UserValidationOptional(), UserController.register);
router.post("/login", UserController.login);

// router.get("/profile", UserController.userProfile);
// router.get("/logout", UserController.logout);
// router.put("/", UserController.updateUser);

module.exports = { userRouter: router };
