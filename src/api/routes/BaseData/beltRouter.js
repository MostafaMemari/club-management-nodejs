const { createBelt, getBelts, deleteBelt, getBelt, updateBelt } = require("../../controllers/BaseData/beltController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");

const beltRouter = require("express").Router();

beltRouter
  .route("/")
  .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), createBelt)
  .get(getBelts);

beltRouter
  .route("/:id")
  .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), deleteBelt)
  .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), updateBelt)
  .get(getBelt);

module.exports = { beltRouter };
