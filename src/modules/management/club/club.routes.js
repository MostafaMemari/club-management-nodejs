const ClubController = require("./club.controller");
const { ClubValidation } = require("./club.validation");

const router = require("express").Router();

router.post("/", ClubValidation(), ClubController.create);
router.get("/", ClubController.find);

module.exports = { clubRouter: router };
