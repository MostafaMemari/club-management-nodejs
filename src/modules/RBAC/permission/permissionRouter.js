const {
  createPermission,
  updatePermission,
  removePermission,
  getPermission,
  getPermissions,
} = require("../../controllers/RBAC/permissionController");

const permissionRouter = require("express").Router();

permissionRouter.route("/").post(createPermission).get(getPermissions);
permissionRouter.route("/:id").put(updatePermission).delete(removePermission).get(getPermission);

module.exports = { permissionRouter };
