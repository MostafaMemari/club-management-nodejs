const { createSport } = require("../../controllers/club/sportController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/staff/userModel");

const sportRouter = require("express").Router();

sportRouter.route("/").post(isAuth(userModel, "Admin"), createSport);

module.exports = {
  sportRouter,
};
