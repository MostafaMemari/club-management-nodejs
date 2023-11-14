const { registerUser, loginUser } = require("../../controllers/staff/userController");

const userRouter = require("express").Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = {
  userRouter,
};
