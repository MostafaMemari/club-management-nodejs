const autoBind = require("auto-bind");
const { copyObject, deleteInvalidPropertyInObject } = require("../../helpers/function");
const { StatusCodes } = require("http-status-codes");
const { weightModel } = require("../../models/BaseData/weightModel");

class weightController {
  constructor() {
    autoBind(this);
  }
  async createWeight(req, res, next) {
    try {
      const data = copyObject(req.body);

      await weightModel.create(data);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "رشته ورزشی مورد نظر با موفقیت ثبت شد",
        sportCreated,
      });
    } catch (error) {
      next(error);
    }
  }
}
module.exports = new weightController();
