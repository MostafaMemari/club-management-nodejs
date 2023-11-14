const { registerUser } = require("../../controllers/staff/userController");

const userRouter = require("express").Router();

userRouter.post("/register", registerUser);

module.exports = {
  userRouter,
};
