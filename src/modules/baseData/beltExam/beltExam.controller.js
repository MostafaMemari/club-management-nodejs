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
      await this.#service.create(req.body);

      console.log(bodyData);

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
}

module.exports = new BeltExamController();
