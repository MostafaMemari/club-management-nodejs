const RoleController = require("./role.controller");
const { RoleValidation } = require("./role.validation");

const router = require("express").Router();

router.post("/", RoleValidation(), RoleController.create);
router.get("/", RoleController.find);

module.exports = { roleRouter: router };
