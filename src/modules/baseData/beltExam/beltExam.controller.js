const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

const { matchedData } = require("express-validator");
const { validate } = require("../../../common/middlewares/validateExpressValidator");
const { BeltExamMessage } = require("./beltExam.message");
const beltExamService = require("./beltExam.service");
const { clearCache } = require("ejs");

class BeltExamController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = beltExamService;
  }

  async create(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.create(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: BeltExamMessage.Create,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const beltExams = await this.#service.find();

      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...beltExams],
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const { id: beltExamID } = req.params;

      await this.#service.checkExistBeltExamByID(beltExamID);
      await this.#service.update(bodyData, beltExamID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: BeltExamMessage.Update,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req, res, next) {
    try {
      const { id: beltExamID } = req.params;
      const beltExam = await this.#service.checkExistBeltExamByID(beltExamID);

      res.status(StatusCodes.OK).json({
        status: "success",
        data: { ...beltExam },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id: beltExamID } = req.params;
      await this.#service.checkExistBeltExamByID(beltExamID);
      this.#service.remove(beltExamID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: BeltExamMessage.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BeltExamController();
