const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

const { matchedData } = require("express-validator");
const { validate } = require("../../../common/middlewares/validateExpressValidator");
const roleService = require("./role.service");
const { RoleMessage } = require("./role.message");

class RoleController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = roleService;
  }

  async create(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.create(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: RoleMessage.Create,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const roles = await this.#service.find();

      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...roles],
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const { id: roleID } = req.params;

      await this.#service.checkExistRoleByID(roleID);
      await this.#service.update(bodyData, roleID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: RoleMessage.Update,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req, res, next) {
    try {
      const { id: roleID } = req.params;
      const role = await this.#service.checkExistRoleByID(roleID);

      res.status(StatusCodes.OK).json({
        status: "success",
        data: { ...role },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id: roleID } = req.params;

      await this.#service.checkExistRoleByID(roleID);
      await this.#service.remove(roleID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: RoleMessage.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new RoleController();
