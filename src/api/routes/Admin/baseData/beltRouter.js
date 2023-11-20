const { createBelt, getBelts, deleteBelt, getBelt, updateBelt } = require("../../../controllers/Admin/baseData/beltController");
const { isAuth } = require("../../../middlewares/isAuth");
const { userModel } = require("../../../models/admin/userModel");

const beltRouter = require("express").Router();

beltRouter.route("/").post(isAuth(userModel, "SUPER_ADMIN"), createBelt).get(isAuth(userModel, "SUPER_ADMIN"), getBelts);

beltRouter
  .route("/:id")
  .delete(isAuth(userModel, "SUPER_ADMIN"), deleteBelt)
  .get(isAuth(userModel, "SUPER_ADMIN"), getBelt)
  .put(isAuth(userModel, "SUPER_ADMIN"), updateBelt);

module.exports = { beltRouter };
