const { userProfile, registerUser, loginUser, updateUser, logout } = require("../../controllers/Personnel/userController");
const { PERMISSIONS } = require("../../helpers/constans");
const { isAuth } = require("../../middlewares/isAuth");
const { checkPermission } = require("../../middlewares/permission.guard");

const userRouter = require("express").Router();

userRouter.get("/profile", isAuth, checkPermission([PERMISSIONS.ADMIN_CLUB]), userProfile);
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logout);

userRouter.put("/", updateUser);

module.exports = {
  userRouter,
};
