const createHttpError = require("http-errors");
const { SportModel } = require("./sport.model");

class SportService {
  async create(bodyData) {
    const resultSportCreate = await SportModel.create({
      ...bodyData,
    });
    if (!resultSportCreate) throw createHttpError.InternalServerError("رشته ورزشی با خطا مواجه شد");
  }
  async find() {
    const sports = await SportModel.find({}).lean();
    if (!sports) throw createHttpError.InternalServerError("دریافت رشته ورزشی با خطا مواجه شد");
    return sports;
  }
}

module.exports = new SportService();
