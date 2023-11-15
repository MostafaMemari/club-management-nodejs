const { ageGroupRouter } = require("./club/ageGroupRouter.js");
const { clubRouter } = require("./club/clubRouter");
const { sportRouter } = require("./club/sportRouter.js");
const { userRouter } = require("./staff/userRouter");

const router = require("express").Router();

router.use("/api/v1/users", userRouter);
router.use("/api/v1/clubs", clubRouter);
router.use("/api/v1/sports", sportRouter);
router.use("/api/v1/ages", ageGroupRouter);

module.exports = {
  AllRouter: router,
};
