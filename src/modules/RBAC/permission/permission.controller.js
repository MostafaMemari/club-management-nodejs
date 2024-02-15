const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

const { matchedData } = require("express-validator");
const { validate } = require("../../../common/middlewares/validateExpressValidator");
const permissionService = require("./permission.service");
const { PermissionMessage } = require("./permission.message");
const roleService = require("../role/role.service");

class PermissionController {
  #service;
  #roleService;
  constructor() {
    autoBind(this);
    this.#service = permissionService;
    this.#roleService = roleService;
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
  async find(req, res, next) {
    try {
      const permissions = await this.#service.find();
      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...permissions],
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const { id: permissionID } = req.params;

      await this.#service.checkExistPermissionByID(permissionID);
      await this.#service.update(bodyData, permissionID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: PermissionMessage.Update,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req, res, next) {
    try {
      const { id: permissionID } = req.params;
      const permission = await this.#service.checkExistPermissionByID(permissionID);

      res.status(StatusCodes.OK).json({
        status: "success",
        data: { ...permission },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id: permissionID } = req.params;

      await this.#service.checkExistPermissionByID(permissionID);
      await this.#service.remove(permissionID);
      await this.#roleService.removeAllPermissionsInRole(permissionID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: PermissionMessage.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PermissionController();
