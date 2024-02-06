const userController = require("../../controllers/Personnel/userController");
const { PERMISSIONS } = require("../../../api/helpers/constans");
const { isAuth } = require("../../../api/middlewares/isAuth");
const { checkPermission } = require("../../../api/middlewares/permission.guard");
const userRouter = require("express").Router();

userRouter.get("/profile", isAuth, checkPermission([PERMISSIONS.ADMIN_CLUB]), userController.userProfile);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);

userRouter.get("/logout", userController.logout);

userRouter.put("/", userController.updateUser);

module.exports = {
  userRouter,
};
