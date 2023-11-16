const { createBelt, deleteBelt } = require("../../controllers/club/beltController");

const beltRouter = require("express").Router();

beltRouter.post("/", createBelt);

beltRouter.route("/:id").delete(deleteBelt);

module.exports = { beltRouter };
