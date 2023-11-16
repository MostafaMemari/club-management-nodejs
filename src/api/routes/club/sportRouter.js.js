const { createSport, getSports, getSport } = require("../../controllers/club/sportController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/staff/userModel");

const sportRouter = require("express").Router();

sportRouter.route("/").post(isAuth(userModel, "Admin"), createSport).get(getSports);

sportRouter.route("/:id").get(isAuth(userModel, "Admin"), getSport).get(getSports);

module.exports = {
  sportRouter,
};
