const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");
const { validate } = require("../../common/services/validateExpressValidator");

const userService = require("./user.service");
const { UserMessage } = require("./user.message");
const { matchedData } = require("express-validator");

class UserController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = userService;
  }
  async register(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.register(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: UserMessage.Register,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
