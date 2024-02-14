const RoleController = require("./role.controller");
const { RoleValidationRequired, RoleValidationOptional } = require("./role.validation");

const router = require("express").Router();

router.post("/", RoleValidationRequired(), RoleValidationOptional(), RoleController.create);
router.get("/", RoleController.find);

router.put("/:id", RoleValidationOptional(), RoleController.update);
router.get("/:id", RoleController.findByID);
router.delete("/:id", RoleController.remove);

module.exports = { roleRouter: router };
