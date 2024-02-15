const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");
const { matchedData } = require("express-validator");

const { validate } = require("../../../common/services/validateExpressValidator");
const sportService = require("./sport.service");
const { SportMessage } = require("./sport.message");
const clubService = require("../../club/club.service");

class SportController {
  #service;
  #clubService;
  constructor() {
    autoBind(this);
    this.#service = sportService;
    this.#clubService = clubService;
  }

  async create(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.create(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: SportMessage.Create,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const sports = await this.#service.find();
      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...sports],
      });
    } catch (error) {
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const { id: sportID } = req.params;

      await this.#service.checkExistSportByID(sportID);
      await this.#service.update(bodyData, sportID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: SportMessage.Update,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req, res, next) {
    try {
      const { id: sportID } = req.params;
      const sport = await this.#service.checkExistSportByID(sportID);

      res.status(StatusCodes.OK).json({
        status: "success",
        data: { ...sport },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id: sportID } = req.params;
      await this.#service.checkExistSportByID(sportID);

      await this.#service.remove(sportID);
      await this.#clubService.removeAllSportsInClub(sportID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: SportMessage.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new SportController();
