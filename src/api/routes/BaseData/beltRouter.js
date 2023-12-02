const beltController = require("../../controllers/BaseData/beltController");
const { PERMISSIONS } = require("../../helpers/constans");
const { checkPermission } = require("../../middlewares/permission.guard");

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
