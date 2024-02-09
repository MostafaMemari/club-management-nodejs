const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

const { matchedData } = require("express-validator");
const { validate } = require("../../../common/middlewares/validateExpressValidator");
const { BeltMessage } = require("./belt.message");
const beltService = require("./belt.service");

class BeltController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = beltService;
  }

  async create(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.create(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: BeltMessage.Create,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BeltController();
