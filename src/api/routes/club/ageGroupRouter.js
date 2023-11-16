const { createAgeGourp, updateAgeGourp, getAgeGroups } = require("../../controllers/club/ageGroupController");
const { isAuth } = require("../../middlewares/isAuth");
const { userModel } = require("../../models/staff/userModel");

const ageGroupRouter = require("express").Router();

ageGroupRouter.route("/").post(isAuth(userModel, "Admin"), createAgeGourp).get(isAuth(userModel, "Admin"), getAgeGroups);

ageGroupRouter.route("/:id").put(isAuth(userModel, "Admin"), updateAgeGourp);

module.exports = {
  ageGroupRouter,
};
