const createHttpError = require("http-errors");
const { BeltExamModel } = require("./beltExam.model");
const { getNextBeltDate } = require("../../../common/utils/function");
const { BeltExamMessage } = require("./beltExam.message");
const { isValidObjectId } = require("mongoose");

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

  async update(bodyData, beltID) {
    const updateResult = await BeltExamModel.updateOne(
      { _id: beltID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(BeltExamMessage.UpdateError);
  }
  async remove(beltID) {
    const removeResult = await BeltExamModel.deleteOne({ _id: beltID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(BeltExamMessage.DeleteError);
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

  async checkExistBeltExamByName(name) {
    const result = await BeltExamModel.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(BeltExamMessage.AlreadyExist);
  }
  async checkExistBeltExamByID(beltExamID) {
    if (!isValidObjectId(beltExamID)) throw createHttpError.InternalServerError("belt exam object id is not valid");

    const result = await BeltExamModel.findById(beltExamID).populate("belts", "name").lean();
    if (!result) throw createHttpError.NotFound(BeltExamMessage.NotFound);
    return result;
  }
}

module.exports = new BeltExamService();
