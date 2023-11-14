const { registerUser, loginUser, userProfile, updateUser } = require("../../controllers/staff/userController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/staff/userModel");

const userRouter = require("express").Router();

userRouter.get("/profile", isAuth(userModel), userProfile);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.put("/", isAuth(userModel), updateUser);

module.exports = {
  userRouter,
};
