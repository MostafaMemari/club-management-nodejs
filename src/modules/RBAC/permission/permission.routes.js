const PermissionController = require("./permission.controller");
const { PermissionValidationRequired, PermissionValidationOptional } = require("./permission.validation");

const router = require("express").Router();

router.post("/", PermissionValidationRequired(), PermissionValidationOptional(), PermissionController.create);
router.get("/", PermissionController.find);

router.put("/:id", PermissionValidationOptional(), PermissionController.update);
router.get("/:id", PermissionController.findByID);
router.delete("/:id", PermissionController.remove);

module.exports = { permissionRouter: router };
