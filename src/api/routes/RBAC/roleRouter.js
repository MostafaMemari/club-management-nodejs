const roleRouter = require("express").Router();

const {
  createRole,
  getRoles,
  getRole,
  deleteRole,
  removePermissionToRole,
  addPermissionToRole,
} = require("../../controllers/RBAC/roleController");

roleRouter.route("/").post(createRole).get(getRoles);
roleRouter.route("/:id").get(getRole).delete(deleteRole);

roleRouter.patch("/:id/permission/:permissionID/remove", removePermissionToRole);
roleRouter.patch("/:id/permission/add", addPermissionToRole);

module.exports = {
  roleRouter,
};
