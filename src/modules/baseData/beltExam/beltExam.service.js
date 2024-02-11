const createHttpError = require("http-errors");
const { BeltExamModel } = require("./beltExam.model");

class BeltExamService {
  async create(bodyData) {
    const resultBeltExamCreated = await BeltExamModel.create({
      ...bodyData,
    });
    if (!resultBeltExamCreated) throw createHttpError.InternalServerError("ثبت آزمون با خطا مواجه شد");
  }

  async find() {
    const beltExams = await BeltExamModel.find({}).populate("belts").lean();
    if (!beltExams) throw createHttpError.InternalServerError("دریافت آزمون با خطا مواجه شد");
    return beltExams;
  }
}

module.exports = new BeltExamService();
