const {
  createAgeGourp,
  getAgeGroups,
  updateAgeGourp,
  getAgeGroup,
  deleteAgeGroup,
} = require("../../controllers/BaseData/ageGroupController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");

const ageGroupRouter = require("express").Router();

ageGroupRouter
  .route("/")
  .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), createAgeGourp)
  .get(getAgeGroups);

ageGroupRouter
  .route("/:id")
  .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), updateAgeGourp)
  .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), deleteAgeGroup)
  .get(getAgeGroup);

module.exports = {
  ageGroupRouter,
};
