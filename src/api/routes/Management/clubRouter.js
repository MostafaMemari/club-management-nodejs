const { createClub, getClubs, getClub } = require("../../controllers/Management/clubController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/admin/userModel");

const clubRouter = require("express").Router();

clubRouter.route("/").post(isAuth(userModel, "Admin"), createClub).get(getClubs);
clubRouter.route("/:id").get(isAuth(userModel, "Admin"), getClub);

module.exports = {
  clubRouter,
};
