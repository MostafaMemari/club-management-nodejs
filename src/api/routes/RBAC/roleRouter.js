const roleRouter = require("express").Router();

const { createRole, getRoles, getRole } = require("../../controllers/RBAC/roleController");

roleRouter.route("/").post(createRole).get(getRoles);
roleRouter.route("/:id").get(getRole);

module.exports = {
  roleRouter,
};
