const createHttpError = require("http-errors");
const { SportModel } = require("./sport.model");

class SportService {
  async create(bodyData) {
    const resultSportCreate = await SportModel.create({
      ...bodyData,
    });
    if (!resultSportCreate) throw createHttpError.InternalServerError("رشته ورزشی با خطا مواجه شد");
  }
}

module.exports = new SportService();
