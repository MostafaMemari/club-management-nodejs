const { createSport, getSports, getSport, deleteSport, updateSport } = require("../../../controllers/Admin/baseData/sportController");
const { isAuth } = require("../../../middlewares/isAuth");
const { userModel } = require("../../../models/admin/userModel");

const sportRouter = require("express").Router();

sportRouter.route("/").post(isAuth(userModel, "SUPER_ADMIN"), createSport).get(isAuth(userModel, "SUPER_ADMIN"), getSports);

sportRouter
  .route("/:id")
  .get(isAuth(userModel, "SUPER_ADMIN"), getSport)
  .get(isAuth(userModel, "SUPER_ADMIN"), getSports)
  .delete(isAuth(userModel, "SUPER_ADMIN"), deleteSport)
  .put(isAuth(userModel, "SUPER_ADMIN"), updateSport);

module.exports = {
  sportRouter,
};
