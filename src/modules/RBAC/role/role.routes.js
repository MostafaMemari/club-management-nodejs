const roleController = require("./role.controller");
const { RoleValidation } = require("./role.validation");

const router = require("express").Router();

router.post("/", RoleValidation(), roleController.create);

module.exports = { roleRouter: router };
