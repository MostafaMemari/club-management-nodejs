const autoBind = require("auto-bind");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const { deleteFileInPublic } = require("../../common/utils/function");
const ageGroupService = require("../baseData/ageGroup/ageGroup.service");
const beltExamService = require("../baseData/beltExam/beltExam.service");
const { validate } = require("../../common/services/validateExpressValidator");

const coachService = require("./coach.service");
const { CoachMessage } = require("./coach.message");
const studentService = require("../student/student.service");

class CoachController {
  #service;
  #studentService;
  constructor() {
    autoBind(this);
    this.#service = coachService;
    this.#studentService = studentService;
  }
  async register(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.register(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: CoachMessage.Register,
      });
    } catch (error) {
      req.body?.imageUrl && deleteFileInPublic(req.body.imageUrl);
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
        message: CoachMessage.Update,
      });
    } catch (error) {
      req.body?.imageUrl && deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const coachs = await this.#service.find();

      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...coachs],
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req, res, next) {
    try {
      const { id: coachID } = req.params;
      await this.#service.checkExistCoachByID(coachID);

      const coach = await this.#service.findByID(coachID);

      res.status(StatusCodes.OK).json({
        status: "success",
        data: { ...coach },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id: coachID } = req.params;

      await this.#service.checkExistCoachByID(coachID);

      await this.#service.remove(coachID);
      await this.#studentService.removeAllCoachInStudnet(coachID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: CoachMessage.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CoachController();
