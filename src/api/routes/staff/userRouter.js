const { registerUser, loginUser, userProfile } = require("../../controllers/staff/userController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/staff/userModel");

const userRouter = require("express").Router();

userRouter.get("/profile", isAuth(userModel), userProfile);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = {
  userRouter,
};
