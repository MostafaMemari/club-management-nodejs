const createHttpError = require("http-errors");
const { ClubModel } = require("./club.model");

class ClubService {
  async create(bodyData) {
    const resultClubCreate = await ClubModel.create({
      ...bodyData,
    });
    if (!resultClubCreate) throw createHttpError.InternalServerError("ثبت باشگاه با خطا مواجه شد");
  }
}

module.exports = new ClubService();
