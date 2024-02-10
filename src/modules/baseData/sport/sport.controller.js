const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

const { matchedData } = require("express-validator");
const { validate } = require("../../../common/middlewares/validateExpressValidator");
const sportService = require("./sport.service");
const { SportMessage } = require("./sport.message");

class SportController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = sportService;
  }

  async create(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.create(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: SportMessage.Create,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SportController();
