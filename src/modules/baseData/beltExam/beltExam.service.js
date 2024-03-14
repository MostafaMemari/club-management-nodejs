const createHttpError = require("http-errors");

const { isValidObjectId } = require("mongoose");
const { BeltExamModel } = require("./beltExam.model");
const { BeltExamMessage } = require("./beltExam.message");
const { nextDateByDurationMonth } = require("../../../common/utils/calculateDate");

class BeltExamService {
  #Model;
  constructor() {
    this.#Model = BeltExamModel;
  }
  async create(bodyData) {
    const resultBeltExamCreated = await this.#Model.create({
      ...bodyData,
    });
    if (!resultBeltExamCreated) throw createHttpError.InternalServerError("ثبت آزمون با خطا مواجه شد");
  }

  async find() {
    const beltExams = await this.#Model.find({}).populate("belts").lean();
    if (!beltExams) throw createHttpError.InternalServerError("دریافت آزمون با خطا مواجه شد");
    return beltExams;
  }

  async update(bodyData, beltID) {
    const updateResult = await this.#Model.updateOne(
      { _id: beltID },
      {
        $set: { ...bodyData },
      }
    );
    if (!updateResult.modifiedCount) throw createHttpError.InternalServerError(BeltExamMessage.UpdateError);
  }
  async remove(beltID) {
    const removeResult = await this.#Model.deleteOne({ _id: beltID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(BeltExamMessage.DeleteError);
  }

  async findBeltExamValidStudent(student) {
    let { gender, belt, beltDate } = student;

    gender = gender === "مرد" ? "آقایان" : gender === "زن" ? "بانوان" : false;
    const nextBeltDate = nextDateByDurationMonth(beltDate, belt.duration);

    const beltExams = await this.#Model
      .find(
        {
          genders: gender,
          eventDate: { $gte: nextBeltDate },
          $or: [{ belts: belt.nextBelt[0] }, { belts: belt.nextBelt[1] }],
        },
        { belts: 0, genders: 0 }
      )
      .lean();

    return beltExams;
  }

  async checkExistBeltExamByName(name) {
    const result = await this.#Model.findOne({ name }).lean();
    if (result) throw createHttpError.Conflict(BeltExamMessage.AlreadyExist);
  }
  async checkExistBeltExamByID(beltExamID) {
    if (!isValidObjectId(beltExamID)) throw createHttpError.InternalServerError("belt exam object id is not valid");

    const result = await this.#Model.findById(beltExamID).populate("belts", "name").lean();
    if (!result) throw createHttpError.NotFound(BeltExamMessage.NotFound);
    return result;
  }
}

module.exports = new BeltExamService();
