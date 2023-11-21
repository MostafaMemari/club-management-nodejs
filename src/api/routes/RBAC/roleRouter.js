const roleRouter = require("express").Router();

const { createRole } = require("../../controllers/RBAC/roleController");

roleRouter.route("/").post(createRole);

module.exports = {
  roleRouter,
};
