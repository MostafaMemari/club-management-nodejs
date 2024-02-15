const UserController = require("./user.controller");
const { UserValidationRequired, UserValidationOptional } = require("./user.validation");

const router = require("express").Router();

router.post("/register", UserValidationRequired(), UserValidationOptional(), UserController.registerUser);

// router.post("/login", UserController.loginUser);
// router.get("/profile", UserController.userProfile);
// router.get("/logout", UserController.logout);
// router.put("/", UserController.updateUser);

module.exports = { userRouter: router };
