const autoBind = require("auto-bind");
const { matchedData } = require("express-validator");
const { StatusCodes } = require("http-status-codes");

const { deleteFileInPublic } = require("../../common/utils/function");
const ageGroupService = require("../baseData/ageGroup/ageGroup.service");
const beltExamService = require("../baseData/beltExam/beltExam.service");
const { validate } = require("../../common/services/validateExpressValidator");

const studentService = require("./student.service");
const { StudentMessage } = require("./student.message");

class StudentController {
  #service;
  #ageGroupService;
  #beltExamService;
  constructor() {
    autoBind(this);
    this.#service = studentService;
    this.#ageGroupService = ageGroupService;
    this.#beltExamService = beltExamService;
  }
  async register(req, res, next) {
    try {
      validate(req);
      const bodyData = matchedData(req, { locations: ["body"] });
      await this.#service.register(bodyData);

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
      const studnetExist = await this.#service.checkExistStudentByID(studentID);

      const listBeltExams = await this.#beltExamService.findBeltExamValidStudent(studnetExist);
      const ageGroup = await this.#ageGroupService.assignAgeGroupStudentBybirthday(studnetExist.birthDay);

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

      await this.#service.checkExistStudentByID(studentID);
      await this.#service.remove(studentID);

      res.status(StatusCodes.OK).json({
        status: "success",
        message: StudentMessage.Delete,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();