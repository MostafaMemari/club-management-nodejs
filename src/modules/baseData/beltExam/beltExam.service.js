const createHttpError = require("http-errors");
const { BeltExamModel } = require("./beltExam.model");

class BeltExamService {
  async create(bodyData) {
    const resultBeltExamCreated = await BeltExamModel.create({
      ...bodyData,
    });
    if (!resultBeltExamCreated) throw createHttpError.InternalServerError("ثبت آزمون با خطا مواجه شد");
  }
}

module.exports = new BeltExamService();
