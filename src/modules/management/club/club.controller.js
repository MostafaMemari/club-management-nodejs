const autoBind = require("auto-bind");
const { validate } = require("../../../common/middlewares/validateExpressValidator");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");
const { ClubMessage } = require("./club.message");
const clubService = require("./club.service");

class ClubController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = clubService;
  }
  async create(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });

      await this.#service.create(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: ClubMessage.Create,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      const clubs = await this.#service.find();
      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...clubs],
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const { id: clubID } = req.params;

      await this.#service.checkExistClubByID(clubID);
      await this.#service.update(bodyData, clubID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: ClubMessage.Update,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req, res, next) {
    try {
      const { id: clubID } = req.params;
      const club = await this.#service.checkExistClubByID(clubID);

      res.status(StatusCodes.OK).json({
        status: "success",
        data: { ...club },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id: clubID } = req.params;

      await this.#service.checkExistClubByID(clubID);
      await this.#service.remove(clubID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: ClubMessage.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new ClubController();
