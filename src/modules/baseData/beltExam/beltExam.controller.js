const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { isValidObjectId } = require("mongoose");
const autoBind = require("auto-bind");

const { copyObject, deleteInvalidPropertyInObject, validateItemArrayModel } = require("../../../common/utils/function");
const { beltExamSchema, beltExamUpdateSchema } = require("../../management/club/clubSchema");
const { beltExamModel } = require("./beltExamModel");

class BeltExamController {
  constructor() {
    autoBind(this);
  }
  async createBeltExam(req, res, next) {
    try {
      const data = copyObject(req.body);
      deleteInvalidPropertyInObject(data);

      // validate
      await beltExamSchema.validateAsync(data);

      const { gender, name } = data;

      // find Belt Exam
      const beltExamFound = await beltExamModel.findOne({ name, gender });
      if (beltExamFound) throw createError.Conflict("آزمون کمربند وارد شده تکراری می باشد");

      // Normalize Belts
      let beltID = data.beltID || [];
      beltID = typeof beltID == "string" ? beltID.replace(/\s/g, "").split(" ") : beltID;
      // find And Validate Belt
      const belts = await validateItemArrayModel(beltModel, beltID);

      // create
      const beltExamCreated = new beltExamModel({ ...data, beltsID: belts });
      await beltExamCreated.save();
      if (!beltExamCreated) throw createError.InternalServerError("ثبت آزمون با خطا مواجه شد");

      res.status(StatusCodes.CREATED).json({
        status: "success",
        message: "ثبت آزمون با موفقیت انجام شد",
        // beltExamCreated,
      });
    } catch (error) {
      next(error);
    }
  }
  async updateBeltExam(req, res, next) {
    try {
      const data = copyObject(req.body);
      const blackListFields = ["beltID", "eventDateEN", "registerDateEN"];
      deleteInvalidPropertyInObject(data, blackListFields);

      // validate
      await beltExamUpdateSchema.validateAsync({ ...data, id: req.params.id });

      let { gender, name } = data;

      // find Belt Exam
      const beltExamExist = await this.checkExistBeltExam(req.params.id);
      if (gender || name) {
        gender = gender ? gender : beltExamExist.gender;
        name = name ? name : beltExamExist.name;

        const beltExamFound = await beltExamModel.findOne({ gender, name });
        if (beltExamFound) {
          delete data["name"];
          delete data["gender"];
        }
      }

      // update
      const beltExamUpdated = await beltExamModel.updateOne({ _id: req.params.id }, data);
      if (!beltExamUpdated.modifiedCount) throw createError.InternalServerError("ویرایش آزمون با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "آزمون مورد نظر با موفقیت ویرایش شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async removeBeltExam(req, res, next) {
    try {
      // validate
      await this.checkExistBeltExam(req.params.id);

      // update
      const beltExamRemoved = await beltExamModel.deleteOne({ _id: req.params.id });
      if (!beltExamRemoved.deletedCount) throw createError.InternalServerError("حذف آزمون با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "آزمون مورد نظر با موفقیت حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async getBeltExams(req, res, next) {
    try {
      const beltExamFound = await beltExamModel.find({}).populate("beltID", "name").select("-eventDateEN -registerDateEN").lean();
      if (!beltExamFound) throw createError.InternalServerError("دریافت آزمون ها با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت آزمون های کمربند با موفقیت انجام شد ",
        beltExamFound,
      });
    } catch (error) {
      next(error);
    }
  }
  async getBeltExam(req, res, next) {
    try {
      // validate
      if (!isValidObjectId(req.params.id)) throw createError.BadRequest("شناسه آزمون کمربند معتبر نمی باشد");

      const beltExamFound = await beltExamModel.findById(req.params.id).populate("beltID", "-duration").select("-eventDateEN -registerDateEN").lean();
      if (!beltExamFound) throw createError.InternalServerError("دریافت آزمون با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "دریافت آزمون با موفقیت انجام شد ",
        beltExamFound,
      });
    } catch (error) {
      next(error);
    }
  }
  async addBeltToBeltExam(req, res, next) {
    try {
      const data = copyObject(req.body);
      const blackListFields = ["name", "description", "eventPlace", "gender", "eventDateIR", "registerDateIR", "eventDateEN", "registerDateEN"];
      deleteInvalidPropertyInObject(data, blackListFields);

      // validate
      await this.checkExistBeltExam(req.params.id);

      // Normalize Belts
      let { beltID } = data;
      beltID = typeof beltID == "string" ? beltID.replace(/\s/g, "").split(" ") : beltID;
      // find And Validate Belt
      const belts = await validateItemArrayModel(beltModel, beltID);

      // add belt to BeltExam
      const beltExamUpdated = await beltExamModel.updateOne({ _id: req.params.id }, { $addToSet: { beltID: belts } });
      if (!beltExamUpdated.modifiedCount) throw createError.InternalServerError("ایجاد کمربند با خطا مواجه شد");

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "کمربند مورد نظر با موفقیت به آزمون اضافه شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async removeBeltToBeltExam(req, res, next) {
    try {
      const data = copyObject(req.body);
      const blackListFields = ["name", "description", "eventPlace", "gender", "eventDateIR", "registerDateIR", "eventDateEN", "registerDateEN"];
      deleteInvalidPropertyInObject(data, blackListFields);

      const { id: examID, beltID } = req.params;

      // validate
      if (!isValidObjectId(beltID)) throw createError.BadRequest("شناسه کمربند معتبر نمی باشد");

      // find belt exam
      const beltExamFound = await this.checkExistBeltExam(examID);

      // find belt
      if (beltID) {
        const beltFound = await beltModel.findById(beltID).lean();
        if (!beltFound) throw createError.NotFound("شناسه کمربند معتبر نمی باشد");
      }

      // check belt in beltExam
      if (!beltExamFound.beltID.includes(beltID)) throw createError.NotFound("کمربند وارد شده یافت نشد");

      // remove belt
      beltExamFound.beltID.pull(beltID);
      beltExamFound.save();

      res.status(StatusCodes.OK).json({
        status: "success",
        message: "کمربند مورد نظر با موفقیت از آزمون حذف شد",
      });
    } catch (error) {
      next(error);
    }
  }
  async checkExistBeltExam(id) {
    if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده رده سنی صحیح نمی باشد");

    // find Belt Exam
    const beltExamFound = await beltExamModel.findById(id);
    if (!beltExamFound) throw createError.NotFound("آزمون مورد نظر یافت نشد");
    return beltExamFound;
  }
}

module.exports = new BeltExamController();
