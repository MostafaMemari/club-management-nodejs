const { userProfile, registerUser, loginUser, updateUser } = require("../../controllers/Admin/userController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/admin/userModel");

const userRouter = require("express").Router();

userRouter.get("/profile", isAuth(userModel), userProfile);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.put("/", isAuth(userModel), updateUser);

module.exports = {
  userRouter,
};
