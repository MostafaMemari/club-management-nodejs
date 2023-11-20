const {
  createClub,
  getClubs,
  getClub,
  deleteClub,
  updateClub,
  removeSportToClub,
  addSportToClub,
} = require("../../controllers/Management/clubController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/admin/userModel");

const clubRouter = require("express").Router();

clubRouter.route("/").post(isAuth(userModel, "SUPER_ADMIN"), createClub).get(getClubs);
clubRouter.route("/:id").get(isAuth(userModel, "SUPER_ADMIN"), getClub).delete(deleteClub).put(updateClub);

clubRouter.patch("/:id/sport/:sportID/remove", isAuth(userModel, "SUPER_ADMIN"), removeSportToClub);
clubRouter.patch("/:id/sport/add", isAuth(userModel, "SUPER_ADMIN"), addSportToClub);

module.exports = {
  clubRouter,
};
