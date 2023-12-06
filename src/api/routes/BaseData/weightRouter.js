const { Router } = require("express");
const weigthController = require("../../controllers/BaseData/weigthController");

const weightRouter = Router();

weightRouter.route("/").post(weigthController.createWeight);

module.exports = { weightRouter };
