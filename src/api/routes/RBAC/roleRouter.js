const roleRouter = require("express").Router();

const { createRole, getRoles } = require("../../controllers/RBAC/roleController");

roleRouter.route("/").post(createRole).get(getRoles);

module.exports = {
  roleRouter,
};
