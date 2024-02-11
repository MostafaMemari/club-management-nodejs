const PermissionController = require("./permission.controller");
const { PermissionValidation } = require("./permission.validation");

const router = require("express").Router();

router.post("/", PermissionValidation(), PermissionController.create);
router.get("/", PermissionController.find);

module.exports = { permissionRouter: router };
