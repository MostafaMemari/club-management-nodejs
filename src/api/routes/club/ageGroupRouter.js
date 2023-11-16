const { createAgeGourp, updateAgeGourp, getAgeGroups, getAgeGroup, deleteAgeGroup } = require("../../controllers/club/ageGroupController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/staff/userModel");

const ageGroupRouter = require("express").Router();

ageGroupRouter.route("/").post(isAuth(userModel, "Admin"), createAgeGourp).get(getAgeGroups);

ageGroupRouter
  .route("/:id")
  .put(isAuth(userModel, "Admin"), updateAgeGourp)
  .get(isAuth(userModel, "Admin"), getAgeGroup)
  .delete(isAuth(userModel, "Admin"), deleteAgeGroup);

module.exports = {
  ageGroupRouter,
};
