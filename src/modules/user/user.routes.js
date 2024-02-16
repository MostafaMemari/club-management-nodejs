const UserController = require("./user.controller");
const { UserValidationRequired, UserValidationOptional } = require("./user.validation");

const router = require("express").Router();

router.post("/register", UserValidationRequired(), UserValidationOptional(), UserController.register);

module.exports = { userRouter: router };
