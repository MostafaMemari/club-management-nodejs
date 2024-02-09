const ageGroupController = require("./belt.controller");
const { BeltValidation } = require("./belt.validation");

const router = require("express").Router();

router.post("/", BeltValidation(), ageGroupController.create);

// router
//   .route("/")
//   .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), ageGroupController.createAgeGourp)
//   .get(ageGroupController.getAgeGroups);

// router
//   .route("/:id")
//   .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), ageGroupController.updateAgeGourp)
//   .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), ageGroupController.deleteAgeGroup)
//   .get(ageGroupController.getAgeGroup);

module.exports = { beltRouter: router };
