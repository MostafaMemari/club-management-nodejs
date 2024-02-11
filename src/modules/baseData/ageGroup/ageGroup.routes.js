const ageGroupController = require("./ageGroup.controller");
const { AgeGroupValidation } = require("./ageGroup.validation");

const router = require("express").Router();

router.post("/", AgeGroupValidation(), ageGroupController.create);
router.get("/", ageGroupController.find);

// router
//   .route("/")
//   .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), ageGroupController.createAgeGourp)
//   .get(ageGroupController.getAgeGroups);

// router
//   .route("/:id")
//   .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), ageGroupController.updateAgeGourp)
//   .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), ageGroupController.deleteAgeGroup)
//   .get(ageGroupController.getAgeGroup);

module.exports = { ageGroupRouter: router };
