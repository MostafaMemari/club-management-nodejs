const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");
const { matchedData } = require("express-validator");

const { validate } = require("../../../common/services/validateExpressValidator");
const { BeltMessage } = require("./belt.message");
const beltService = require("./belt.service");
const studentService = require("../../student/student.service");

class BeltController {
  #service;
  #studentService;
  constructor() {
    autoBind(this);
    this.#service = beltService;
    this.#studentService = studentService;
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
  async find(req, res, next) {
    try {
      const belts = await this.#service.find();

      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...belts],
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const { id: beltID } = req.params;

      await this.#service.checkExistBeltByID(beltID);
      await this.#service.update(bodyData, beltID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: BeltMessage.Update,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req, res, next) {
    try {
      const { id: beltID } = req.params;
      const beltExist = await this.#service.checkExistBeltByID(beltID);

      res.status(StatusCodes.OK).json({
        status: "success",
        data: { ...beltExist },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id: beltID } = req.params;

      await this.#service.checkExistBeltByID(beltID);
      await this.#service.remove(beltID);
      await this.#studentService.removeAllBeltInStudnet(beltID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: BeltMessage.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BeltController();
