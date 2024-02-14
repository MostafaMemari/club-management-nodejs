const createHttpError = require("http-errors");
const { StudentModel } = require("./student.model");
const { assignAgeGroups } = require("../../../common/utils/assignAgeGroups");
const { AgeGroupModel } = require("../../baseData/ageGroup/ageGroup.model");
const { isValidObjectId } = require("mongoose");
const { Types } = require("mongoose");
const { getNextBeltDate } = require("../../../common/utils/function");

class StudentService {
  async register(bodyData) {
    const studentCreated = await StudentModel.create({
      ...bodyData,
    });
    if (!studentCreated) throw createHttpError.InternalServerError("ثبت نام با خطا مواجه شد");
  }
  async update(bodyData, paramData) {
    await this.checkExistStudentByID(paramData.id);
    const studentCreated = await StudentModel.updateOne({ _id: paramData.id }, { ...bodyData });
    if (!studentCreated.modifiedCount) throw createHttpError.InternalServerError("بروزرسانی اطلاعات با خطا مواجه شد");
  }
  async find() {
    const ageGroupDB = await AgeGroupModel.find({}).lean();
    const students = await StudentModel.aggregate([
      {
        $match: {},
      },
      {
        $limit: 50,
      },
      {
        $addFields: {
          ageGroups: {
            $function: {
              body: assignAgeGroups,
              args: ["$birthDayMiladi", ageGroupDB],
              lang: "js",
            },
          },
        },
      },
    ]);

    if (!students) throw createHttpError.InternalServerError("دریافت رده سنی با خطا مواجه شد");
    return students;
  }
  async findByID(studentID) {
    const student = await StudentModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(studentID) },
      },
      {
        $lookup: {
          from: "belts",
          localField: "belt",
          foreignField: "_id",
          as: "belt",
        },
      },
      { $unwind: "$belt" },
      {
        $addFields: {
          "belt.nextBeltDate": {
            $function: {
              body: getNextBeltDate,
              args: ["$beltDate", "$belt.duration"],
              lang: "js",
            },
          },
          "belt.beltDate": "$beltDate",
        },
      },
      {
        $project: {
          "belt.nextBelt": 0,
          "belt.duration": 0,
        },
      },
    ]);

    if (!student) throw createHttpError.InternalServerError("دریافت رده سنی با خطا مواجه شد");
    return student;
  }

  async checkExistStudentByID(studentID) {
    if (!isValidObjectId(studentID)) throw createHttpError.BadRequest("student id is not valid");
    const studnet = await StudentModel.findById(studentID).populate("belt").lean();
    if (!studnet) throw createHttpError.NotFound("student not found");
    return studnet;
  }
  async removeBeltStudnet(beltID) {
    await StudentModel.updateMany({ belt: beltID }, { $unset: { belt: -1, beltDate: -1 } });
  }
}

module.exports = new StudentService();
