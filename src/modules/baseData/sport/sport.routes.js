const SportController = require("./sport.controller");
const { SportValidationRequired, SportValidationOptional } = require("./sport.validation");

const router = require("express").Router();

router.post("/", SportValidationRequired(), SportValidationOptional(), SportController.create);
router.get("/", SportController.find);

router.put("/:id", SportValidationOptional(), SportController.update);
router.get("/:id", SportController.findByID);
router.delete("/:id", SportController.remove);

module.exports = { sportRouter: router };
