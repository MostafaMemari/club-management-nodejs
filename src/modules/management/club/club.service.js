const createHttpError = require("http-errors");
const { ClubModel } = require("./club.model");

class ClubService {
  async create(bodyData) {
    const resultClubCreate = await ClubModel.create({
      ...bodyData,
    });
    if (!resultClubCreate) throw createHttpError.InternalServerError("ثبت باشگاه با خطا مواجه شد");
  }

  async find() {
    const clubs = await ClubModel.find({}).populate("sports", "name").lean();
    if (!clubs) throw createHttpError.InternalServerError("دریافت باشگاه با خطا مواجه شد");
    return clubs;
  }
}

module.exports = new ClubService();
