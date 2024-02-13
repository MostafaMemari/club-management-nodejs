const createHttpError = require("http-errors");
const { StudentModel } = require("./student.model");
const { deleteFileInPublic } = require("../../../common/utils/function");
const { assignAgeGroups } = require("../../../common/utils/assignAgeGroups");
const { AgeGroupModel } = require("../../baseData/ageGroup/ageGroup.model");
const { isValidObjectId } = require("mongoose");
const { Types } = require("mongoose");

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
  async findByID(paramData) {
    await this.checkExistStudentByID(paramData.id);

    const ageGroupDB = await AgeGroupModel.find({}).lean();
    const student = await StudentModel.aggregate([
      {
        $match: { _id: new Types.ObjectId(paramData.id) },
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

    if (!student) throw createHttpError.InternalServerError("دریافت رده سنی با خطا مواجه شد");
    return student;
  }

  async checkExistStudentByID(id) {
    if (!isValidObjectId(id)) throw createHttpError.BadRequest("student id is not valid");
    const studnet = await StudentModel.findById(id);
    if (!studnet) throw createHttpError.NotFound("student not found");
    return studnet;
  }
}

module.exports = new StudentService();
