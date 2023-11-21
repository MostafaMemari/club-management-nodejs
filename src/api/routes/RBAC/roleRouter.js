const roleRouter = require("express").Router();

const { createRole, getRoles, getRole, deleteRole } = require("../../controllers/RBAC/roleController");

roleRouter.route("/").post(createRole).get(getRoles);
roleRouter.route("/:id").get(getRole).delete(deleteRole);

module.exports = {
  roleRouter,
};
