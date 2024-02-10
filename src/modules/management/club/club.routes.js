const clubController = require("./club.controller");
const { ClubValidation } = require("./club.validation");

const router = require("express").Router();

router.post("/", ClubValidation(), clubController.create);

module.exports = { clubRouter: router };
