const { userProfile, registerUser, loginUser, updateUser } = require("../../controllers/Personnel/userController");

const userRouter = require("express").Router();

userRouter.get("/profile", userProfile);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

userRouter.put("/", updateUser);

module.exports = {
  userRouter,
};
