const clubController = require("../../controllers/Management/clubController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");
const clubRouter = require("express").Router();

clubRouter
  .route("/")
  .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), clubController.createClub)
  .get(clubController.getClubs);
clubRouter
  .route("/:id")
  .get(clubController.getClub)
  .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), clubController.deleteClub)
  .put(checkPermission([PERMISSIONS.ADMIN_CLUB]), clubController.updateClub);
clubController;
clubRouter.patch("/:id/sport/:sportID/remove", clubController.removeSportToClub);
clubRouter.patch("/:id/sport/add", clubController.addSportToClub);

module.exports = {
  clubRouter,
};
