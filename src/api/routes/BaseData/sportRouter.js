const sportController = require("../../controllers/BaseData/sportController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");

const sportRouter = require("express").Router();
sportRouter
  .route("/")
  .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), sportController.createSport)
  .get(sportController.getSports);

sportRouter
  .route("/:id")
  .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), sportController.deleteSport)
  .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), sportController.updateSport)
  .get(sportController.getSport);

module.exports = {
  sportRouter,
};
