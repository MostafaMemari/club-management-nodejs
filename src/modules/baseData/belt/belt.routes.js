const beltController = require("../../controllers/BaseData/beltController");
const { PERMISSIONS } = require("../../../common/utils/constans");
const { checkPermission } = require("../../../common/guard/permission.guard");

const beltRouter = require("express").Router();

beltRouter
  .route("/")
  .post(checkPermission([PERMISSIONS.SUPER_ADMIN]), beltController.createBelt)
  .get(beltController.getBelts);

beltRouter
  .route("/:id")
  .delete(checkPermission([PERMISSIONS.SUPER_ADMIN]), beltController.deleteBelt)
  .put(checkPermission([PERMISSIONS.SUPER_ADMIN]), beltController.updateBelt)
  .get(beltController.getBelt);

module.exports = { beltRouter };
