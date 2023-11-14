const { userRouter } = require("./staff/userRouter");

const router = require("express").Router();

router.use("/api/v1/users", userRouter);

module.exports = {
  AllRouter: router,
};
