const permissionController = require("./permission.controller");
const { PermissionValidation } = require("./permission.validation");

const router = require("express").Router();

router.post("/", PermissionValidation(), permissionController.create);

module.exports = { permissionRouter: router };
