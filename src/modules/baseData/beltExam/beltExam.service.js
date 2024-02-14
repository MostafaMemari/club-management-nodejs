const createHttpError = require("http-errors");
const { BeltExamModel } = require("./beltExam.model");
const { getNextBeltDate } = require("../../../common/utils/function");

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

  async findBeltExamValidStudent(student) {
    let { gender, belt, beltDate } = student;

    gender = gender === "مرد" ? "آقایان" : gender === "زن" ? "بانوان" : false;
    const nextBeltDate = getNextBeltDate(beltDate, belt.duration);

    const beltExams = await BeltExamModel.find(
      {
        genders: gender,
        eventDate: { $gte: nextBeltDate },
        $or: [{ belts: belt.nextBelt[0] }, { belts: belt.nextBelt[1] }],
      },
      { belts: 0, genders: 0 }
    ).lean();

    return beltExams;
  }
}

module.exports = new BeltExamService();
