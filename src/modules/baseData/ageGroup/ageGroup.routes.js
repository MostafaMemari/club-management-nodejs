const AgeGroupController = require("./ageGroup.controller");
const { AgeGroupValidationRequired, AgeGroupValidationOptional } = require("./ageGroup.validation");

const router = require("express").Router();
router.post("/", AgeGroupValidationRequired(), AgeGroupValidationOptional(), AgeGroupController.create);
router.get("/", AgeGroupController.find);
router.get("/:id", AgeGroupController.findByID);
router.put("/:id", AgeGroupValidationOptional(), AgeGroupController.update);
router.delete("/:id", AgeGroupController.remove);

module.exports = { ageGroupRouter: router };
