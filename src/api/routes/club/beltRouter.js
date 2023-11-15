const { createBelt } = require("../../controllers/club/beltController");

const beltRouter = require("express").Router();

beltRouter.post("/", createBelt);

module.exports = { beltRouter };
