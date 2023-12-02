const ageGroupController = require("../../controllers/BaseData/ageGroupController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");

const ageGroupRouter = require("express").Router();
ageGroupRouter
  .route("/")
  .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), ageGroupController.createAgeGourp)
  .get(ageGroupController.getAgeGroups);

ageGroupRouter
  .route("/:id")
  .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), ageGroupController.updateAgeGourp)
  .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), ageGroupController.deleteAgeGroup)
  .get(ageGroupController.getAgeGroup);

module.exports = {
  ageGroupRouter,
};
