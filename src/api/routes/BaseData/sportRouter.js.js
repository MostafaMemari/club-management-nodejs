const { createSport, getSport, getSports, deleteSport, updateSport } = require("../../controllers/baseData/sportController");
const { PERMISSIONS } = require("../../helpers/constans");
const { isAuth } = require("../../middlewares/isAuth");
const { checkPermission } = require("../../middlewares/permission.guard");

const sportRouter = require("express").Router();

sportRouter
  .route("/")
  .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), createSport)
  .get(getSports);

sportRouter
  .route("/:id")
  .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), deleteSport)
  .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), updateSport)
  .get(getSport);

module.exports = {
  sportRouter,
};
