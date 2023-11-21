const {
  createAgeGourp,
  getAgeGroups,
  updateAgeGourp,
  getAgeGroup,
  deleteAgeGroup,
} = require("../../controllers/BaseData/ageGroupController");

const ageGroupRouter = require("express").Router();

ageGroupRouter.route("/").post(createAgeGourp).get(getAgeGroups);

ageGroupRouter.route("/:id").put(updateAgeGourp).get(getAgeGroup).delete(deleteAgeGroup);

module.exports = {
  ageGroupRouter,
};
