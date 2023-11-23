const {
  createClub,
  getClubs,
  getClub,
  deleteClub,
  updateClub,
  removeSportToClub,
  addSportToClub,
} = require("../../controllers/Management/clubController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");

const clubRouter = require("express").Router();

clubRouter
  .route("/")
  .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), createClub)
  .get(getClubs);
clubRouter
  .route("/:id")
  .get(getClub)
  .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), deleteClub)
  .put(checkPermission([PERMISSIONS.ADMIN_CLUB]), updateClub);

clubRouter.patch("/:id/sport/:sportID/remove", removeSportToClub);
clubRouter.patch("/:id/sport/add", addSportToClub);

module.exports = {
  clubRouter,
};
