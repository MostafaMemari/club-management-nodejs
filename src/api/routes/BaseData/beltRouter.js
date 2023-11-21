const { createBelt, getBelts, deleteBelt, getBelt, updateBelt } = require("../../controllers/BaseData/beltController");

const beltRouter = require("express").Router();

beltRouter.route("/").post(createBelt).get(getBelts);

beltRouter.route("/:id").delete(deleteBelt).get(getBelt).put(updateBelt);

module.exports = { beltRouter };
