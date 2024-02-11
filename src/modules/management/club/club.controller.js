const autoBind = require("auto-bind");
const { validate } = require("../../../common/middlewares/validateExpressValidator");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { ClubMessage } = require("./club.message");
const clubService = require("./club.service");

class ClubController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = clubService;
  }
  async create(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.create(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: ClubMessage.Create,
      });
    } catch (error) {
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const clubs = await this.#service.find();
      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...clubs],
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClubController();
