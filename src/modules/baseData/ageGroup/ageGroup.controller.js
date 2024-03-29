const { StatusCodes } = require("http-status-codes");
const autoBind = require("auto-bind");

const ageGroupService = require("./ageGroup.service");
const { matchedData } = require("express-validator");
const { validate } = require("../../../common/services/validateExpressValidator");
const { AgeGroupMessage } = require("./ageGroup.message");

class AgeGroupController {
  #service;
  constructor() {
    autoBind(this);
    this.#service = ageGroupService;
  }

  async create(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });

      await this.#service.create(bodyData);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: AgeGroupMessage.Create,
      });
    } catch (error) {
      next(error);
    }
  }
  async find(req, res, next) {
    try {
      console.log(req.headers);
      const ageGroups = await this.#service.find();

      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...ageGroups],
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const { id: ageGroupID } = req.params;

      await this.#service.checkExistAgeGroupByID(ageGroupID);
      await this.#service.update(bodyData, ageGroupID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: AgeGroupMessage.Update,
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req, res, next) {
    try {
      const { id: ageGroupID } = req.params;
      const ageGroup = await this.#service.checkExistAgeGroupByID(ageGroupID);

      res.status(StatusCodes.OK).json({
        status: "success",
        data: { ...ageGroup },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id: ageGroupID } = req.params;
      await this.#service.checkExistAgeGroupByID(ageGroupID);
      await this.#service.remove(ageGroupID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: AgeGroupMessage.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AgeGroupController();
