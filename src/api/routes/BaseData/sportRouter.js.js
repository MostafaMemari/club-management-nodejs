const { createSport, getSport, getSports, deleteSport, updateSport } = require("../../controllers/baseData/sportController");
const { isAuth } = require("../../middlewares/isAuth");

const sportRouter = require("express").Router();

sportRouter.route("/").post(isAuth, createSport).get(isAuth, getSports);

sportRouter.route("/:id").get(isAuth, getSport).get(isAuth, getSports).delete(isAuth, deleteSport).put(isAuth, updateSport);

module.exports = {
  sportRouter,
};
