const { createBelt, deleteBelt, getBelt, getBelts, updateBelt } = require("../../controllers/club/beltController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/staff/userModel");

const beltRouter = require("express").Router();

beltRouter.route("/").post(isAuth(userModel, "Admin"), createBelt).get(getBelts);

beltRouter
  .route("/:id")
  .delete(isAuth(userModel, "Admin"), deleteBelt)
  .get(isAuth(userModel, "Admin"), getBelt)
  .put(isAuth(userModel, "Admin"), updateBelt);

module.exports = { beltRouter };
