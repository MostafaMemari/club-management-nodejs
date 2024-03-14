const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { Types } = require("mongoose");

const { filterAssignAgeGroupsByBirthDay } = require("../../common/utils/function");
const { AgeGroupModel } = require("../baseData/ageGroup/ageGroup.model");
const {
  nextBeltByBirthDay,
  calculateYearMonthDayStatusByDateShamsi,
  nextDateByDurationMonth,
  percentDateShamsiByDurationMonth,
  percentLastYearDateShamsiByDateNow,
  calculateMemberShipValidity,
} = require("../../common/utils/calculateDate");

const { StudentMessage } = require("./student.message");
const { StudentModel } = require("./student.model");
const beltExamService = require("../baseData/beltExam/beltExam.service");
const ageGroupService = require("../baseData/ageGroup/ageGroup.service");

class StudentService {
  #Model;
  #beltExamService;
  #ageGroupService;
  constructor() {
    this.#Model = StudentModel;
    this.#beltExamService = beltExamService;
    this.#ageGroupService = ageGroupService;
  }
  async register(bodyData, userAuth) {
    if (userAuth.role === "COACH" && !userAuth.clubs.includes(bodyData?.club)) {
      throw createHttpError.BadRequest("club is not valid");
    }

    if (userAuth.role === "COACH") {
      bodyData.coach = userAuth._id;
    }

    const studentCreated = await this.#Model.create({
      ...bodyData,
      createdBy: userAuth._id,
      modelCreatedBy: userAuth.role === "SUPER_ADMIN" || userAuth.role === "ADMIN_CLUB" ? "user" : userAuth.role === "COACH" ? "coach" : "",
    });
    if (!studentCreated) throw createHttpError.InternalServerError();

    return studentCreated;
  }

  async find() {
    const ageGroupDB = await AgeGroupModel.find({}).lean();
    const students = await this.#Model.aggregate([
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
              body: filterAssignAgeGroupsByBirthDay,
              args: ["$birthDay", ageGroupDB],
              lang: "js",
            },
          },
        },
      },
    ]);

    if (!students) throw createHttpError.InternalServerError();
    return students;
  }

  async update(bodyData, paramData) {
    await this.checkExistStudentByID(paramData.id);
    const studentCreated = await this.#Model.updateOne({ _id: paramData.id }, { ...bodyData });
    if (!studentCreated.modifiedCount) throw createHttpError.InternalServerError("بروزرسانی اطلاعات با خطا مواجه شد");
  }
  async findByID(studentID) {
    const studentExist = await this.checkExistStudentByID(studentID);

    const listBeltExams = await this.#beltExamService.findBeltExamValidStudent(studentExist);
    const ageGroups = await this.#ageGroupService.assignAgeGroupStudentByBirthday(studentExist.birthDay);
    const nextBelt = this.nextBeltDateInfoStudent(studentExist);

    const percentSportsInsuranceDate = studentExist?.sportsInsuranceDate
      ? this.sportsInsuranceDateInfo(studentExist.sportsInsuranceDate)
      : { status: "ثبت نشده" };

    const memberShipValidity = calculateMemberShipValidity(studentExist.memberShipValidity);

    const student = await this.#Model
      .aggregate([
        {
          $match: { _id: new Types.ObjectId(studentExist._id) },
        },
        {
          $addFields: {
            belt: {
              name: studentExist.belt.name,
              beltDate: "$beltDate",
              nextBelt,
            },
            sportsInsurance: {
              ...percentSportsInsuranceDate,
            },
            memberShipValidity: {
              ...memberShipValidity,
            },
          },
        },
        {
          $lookup: {
            from: "clubs",
            localField: "club",
            foreignField: "_id",
            as: "club",
          },
        },
        { $unwind: "$club" },
        { $addFields: { club: "$club.name" } },
        {
          $project: {
            beltDate: 0,
          },
        },
      ])
      .then((items) => items[0]);

    if (!student) throw createHttpError.InternalServerError();
    return { ...student, listBeltExams, ageGroups };
  }
  async remove(studentID) {
    const removeResult = await this.#Model.deleteOne({ _id: studentID });
    if (!removeResult.deletedCount) throw createHttpError.InternalServerError(StudentMessage.DeleteError);
  }

  async checkExistStudentByID(studentID) {
    if (!isValidObjectId(studentID)) throw createHttpError.BadRequest("student id is not valid");
    const studnet = await this.#Model
      .findById(studentID)
      .populate({
        path: "belt",
        populate: {
          path: "nextBelt",
          model: "belt",
          select: "name duration underYear upperYear",
        },
      })
      .lean();
    if (!studnet) throw createHttpError.NotFound("student not found");
    return studnet;
  }
  async checkExistStudentByNationalCode(nationalCode) {
    const studnet = await this.#Model.findOne({ nationalCode }).lean();
    if (studnet) throw createHttpError.NotFound(StudentMessage.AlreadyExist);
  }
  async removeAllBeltInStudnet(beltID) {
    await this.#Model.updateMany({ belt: beltID }, { $unset: { belt: -1, beltDate: -1 } });
  }
  async removeAllCoachInStudnet(coachID) {
    await this.#Model.updateMany({ coach: coachID }, { $unset: { coach: -1 } });
  }
  nextBeltDateInfoStudent(studentExist) {
    const nextBelt = nextBeltByBirthDay(studentExist.birthDay, studentExist.belt.nextBelt);
    const nextBeltDate = nextDateByDurationMonth(studentExist.beltDate, studentExist.belt.duration);
    const nextBeltDateInfo = calculateYearMonthDayStatusByDateShamsi(nextBeltDate);
    const percent = percentDateShamsiByDurationMonth(nextBeltDate, studentExist.belt.duration * 30);

    return {
      ...nextBeltDateInfo,
      percent,
      name: nextBelt.name,
      date: nextBeltDate,
    };
  }
  sportsInsuranceDateInfo(sportsInsuranceDate) {
    const percent = percentLastYearDateShamsiByDateNow(sportsInsuranceDate);
    const sportsInsuranceDateInfo = calculateYearMonthDayStatusByDateShamsi(sportsInsuranceDate);

    return {
      date: sportsInsuranceDate,
      percent,
      ...sportsInsuranceDateInfo,
    };
  }
}

module.exports = new StudentService();
