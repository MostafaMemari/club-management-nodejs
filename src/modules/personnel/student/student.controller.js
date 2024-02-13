const autoBind = require("auto-bind");
const { matchedData, body } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const studentService = require("./student.service");
const { StudentMessage } = require("./student.message");
const { validate } = require("../../../common/middlewares/validateExpressValidator");
const { deleteFileInPublic } = require("../../../common/utils/function");
const { isValidObjectId } = require("mongoose");
const createHttpError = require("http-errors");
const { StudentModel } = require("./student.model");

class StudentController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = studentService;
  }
  async register(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.register(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: StudentMessage.Register,
      });
    } catch (error) {
      req.body.imageUrl && deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const paramData = req.params;

      await this.#service.update(bodyData, paramData);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: StudentMessage.Update,
      });
    } catch (error) {
      req.body.imageUrl && deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const students = await this.#service.find();

      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...students],
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req, res, next) {
    try {
      const paramData = req.params;

      const student = await this.#service.findByID(paramData);

      res.status(StatusCodes.OK).json({
        status: "success",
        data: student,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
