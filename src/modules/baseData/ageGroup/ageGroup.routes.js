const AgeGroupController = require("./ageGroup.controller");
const { AgeGroupValidationRequired, AgeGroupValidationOptional } = require("./ageGroup.validation");

const router = require("express").Router();
router.post("/", AgeGroupValidationRequired(), AgeGroupValidationOptional(), AgeGroupController.create);
router.get("/", AgeGroupController.find);
router.get("/:id", AgeGroupController.findByID);

// router
//   .route("/")
//   .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), AgeGroupController.createAgeGourp)
//   .get(AgeGroupController.getAgeGroups);

// router
//   .route("/:id")
//   .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), AgeGroupController.updateAgeGourp)
//   .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), AgeGroupController.deleteAgeGroup)
//   .get(AgeGroupController.getAgeGroup);

module.exports = { ageGroupRouter: router };
