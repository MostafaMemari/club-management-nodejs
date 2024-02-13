const createHttpError = require("http-errors");
const { BeltExamModel } = require("./beltExam.model");
const { nextBeltDate } = require("../../../common/utils/function");

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

  async findBeltExamValidStudent(studentBeltData) {
    console.log(studentBeltData);
    let { gender, belt } = studentBeltData;
    gender = gender === "مرد" ? "آقایان" : gender === "زن" ? "بانوان" : false;
    const nextBelt = nextBeltDate(belt.beltDate, belt.duration);
    console.log(nextBelt);

    const beltExams = await BeltExamModel.find({ genders: gender, eventDate: { $gte: nextBelt }, belts: belt._id }).lean();
    console.log(beltExams);
    // if (!beltExams) throw createHttpError.InternalServerError("دریافت آزمون با خطا مواجه شد");
    // return beltExams;
  }
}

module.exports = new BeltExamService();
