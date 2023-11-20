const {
  createAgeGourp,
  getAgeGroups,
  updateAgeGourp,
  getAgeGroup,
  deleteAgeGroup,
} = require("../../../controllers/Admin/baseData/ageGroupController");
const { isAuth } = require("../../../middlewares/isAuth");
const { userModel } = require("../../../models/admin/userModel");

const ageGroupRouter = require("express").Router();

ageGroupRouter.route("/").post(isAuth(userModel, "SUPER_ADMIN"), createAgeGourp).get(isAuth(userModel, "SUPER_ADMIN"), getAgeGroups);

ageGroupRouter
  .route("/:id")
  .put(isAuth(userModel, "SUPER_ADMIN"), updateAgeGourp)
  .get(isAuth(userModel, "SUPER_ADMIN"), getAgeGroup)
  .delete(isAuth(userModel, "SUPER_ADMIN"), deleteAgeGroup);

module.exports = {
  ageGroupRouter,
};
