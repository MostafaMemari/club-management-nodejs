const {
  createClub,
  getClubs,
  getClub,
  deleteClub,
  updateClub,
  removeSportToClub,
  addSportToClub,
} = require("../../controllers/Management/clubController");

const clubRouter = require("express").Router();

clubRouter.route("/").post(createClub).get(getClubs);
clubRouter.route("/:id").get(getClub).delete(deleteClub).put(updateClub);

clubRouter.patch("/:id/sport/:sportID/remove", removeSportToClub);
clubRouter.patch("/:id/sport/add", addSportToClub);

module.exports = {
  clubRouter,
};
