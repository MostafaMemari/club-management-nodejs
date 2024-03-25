const autoBind = require("auto-bind");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const { deleteFileInPublic, dateDiffYearNowShamsi, nextBeltByBirthDay, calculateNextBeltByBeltDate } = require("../../common/utils/function");
const ageGroupService = require("../baseData/ageGroup/ageGroup.service");
const beltExamService = require("../baseData/beltExam/beltExam.service");
const { validate } = require("../../common/services/validateExpressValidator");

const studentService = require("./student.service");
const { StudentMessage } = require("./student.message");
const coachService = require("../coach/coach.service");

class StudentController {
  #service;
  #ageGroupService;
  #beltExamService;
  #coachService;
  constructor() {
    autoBind(this);
    this.#service = studentService;
    this.#ageGroupService = ageGroupService;
    this.#beltExamService = beltExamService;
    this.#coachService = coachService;
  }
  async register(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const userAuth = req.userAuth;

      if (userAuth.role === "SUPER_ADMIN" || userAuth.role === "ADMIN_CLUB") {
        await this.#coachService.checkClubInCoach(bodyData.coach, bodyData.club);
      }
      await this.#service.register(bodyData, userAuth);

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: StudentMessage.Register,
      });
    } catch (error) {
      req.body.imageUrl && deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const paramData = req.params;

      console.log(bodyData);

      await this.#service.update(bodyData, paramData);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: StudentMessage.Update,
      });
    } catch (error) {
      req.body.imageUrl && deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }

  async find(req, res, next) {
    try {
      const students = await this.#service.find();

      res.status(StatusCodes.OK).json({
        status: "success",
        data: [...students],
      });
    } catch (error) {
      next(error);
    }
  }
  async findByID(req, res, next) {
    try {
      const { id: studentID } = req.params;

      const student = await this.#service.findByID(studentID);

      res.status(StatusCodes.OK).json({
        status: "success",
        data: { ...student, listBeltExams, ageGroup },
      });
    } catch (error) {
      next(error);
    }
  }
  async remove(req, res, next) {
    try {
      const { id: studentID } = req.params;

      const studentExist = await this.#service.checkExistStudentByID(studentID);
      await this.#service.remove(studentID);
      studentExist.imageUrl && deleteFileInPublic(studentExist.imageUrl);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: StudentMessage.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}
class StudentControllerForm {
  #service;
  #ageGroupService;
  #beltExamService;
  #coachService;
  constructor() {
    autoBind(this);
    this.#service = studentService;
    this.#ageGroupService = ageGroupService;
    this.#beltExamService = beltExamService;
    this.#coachService = coachService;
  }
  async register(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const userAuth = req.userAuth;

      if (userAuth.role === "SUPER_ADMIN" || userAuth.role === "ADMIN_CLUB") {
        await this.#coachService.checkClubInCoach(bodyData.coach, bodyData.club);
      }
      await this.#service.register(bodyData, userAuth);

      req.flash("success", "هنرجو با موفقیت ثبت شد");
      return res.redirect("/students");
    } catch (error) {
      req.body.imageUrl && deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }
  async update(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      const paramData = req.params;

      await this.#service.update(bodyData, paramData);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: StudentMessage.Update,
      });
    } catch (error) {
      req.body.imageUrl && deleteFileInPublic(req.body.imageUrl);
      next(error);
    }
  }
}

module.exports = {
  StudentController: new StudentController(),
  StudentControllerForm: new StudentControllerForm(),
};
