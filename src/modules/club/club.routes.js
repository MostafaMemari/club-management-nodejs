const { ClubController, ClubControllerForm } = require("./club.controller");
const { ClubValidationRequired, ClubValidationOptional } = require("./club.validation");

const router = require("express").Router();

router.post("/", ClubValidationRequired(), ClubValidationOptional(), ClubController.create);
router.get("/", ClubController.find);

router.put("/:id", ClubValidationOptional(), ClubController.update);
router.get("/:id", ClubController.findByID);
router.delete("/:id", ClubController.remove);

router.post("/form", ClubValidationRequired(), ClubValidationOptional(), ClubControllerForm.create);

module.exports = { clubRouter: router };
