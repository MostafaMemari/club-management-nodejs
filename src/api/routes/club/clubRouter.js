const { createClub } = require("../../controllers/club/clubController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/staff/userModel");

const clubRouter = require("express").Router();

clubRouter.route("/").post(isAuth(userModel, "Admin"), createClub);

module.exports = {
  clubRouter,
};
