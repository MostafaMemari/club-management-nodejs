const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

const { matchedData } = require("express-validator");
const { validate } = require("../../../common/middlewares/validateExpressValidator");
const permissionService = require("./permission.service");
const { PermissionMessage } = require("./permission.message");

class PermissionController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = permissionService;
  }

  async create(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.create(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: PermissionMessage.Create,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PermissionController();
