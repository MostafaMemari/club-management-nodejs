const { registerUser, loginUser, userProfile } = require("../../controllers/staff/userController");
const { isAuth } = require("../../middlewares/isAuth");

const userRouter = require("express").Router();

userRouter.get("/profile", isAuth, userProfile);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

module.exports = {
  userRouter,
};
