const autoBind = require("auto-bind");
const { isValidObjectId } = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const createError = require("http-errors");

const { copyObject, deleteInvalidPropertyInObject } = require("../../../api/helpers/function");
const { clubModel } = require("./clubModel");
const { clubSchema, clubSchemaUpdate } = require("../../../api/validations/clubSchema");
const { sportModel } = require("../../models/BaseData/sportModel");
const { studentModel } = require("../../personnel/student/studentModel");

class ClubController {
  constructor() {
    autoBind(this);
  }
  async createClub(req, res, next) {
    const data = copyObject(req.body);
    deleteInvalidPropertyInObject(data);

    // validate
    await clubSchema.validateAsync(data);

    const { sportID, name } = data;

    // find club
    const clubFound = await clubModel.findOne({ name });
    if (clubFound) throw createError.Conflict("نام باشگاه تکراری است");

    // find sport
    const sportFound = await sportModel.findById(sportID);
    if (!sportFound) throw createError.NotFound("رشته ورزشی مورد نظر یافت نشد");

    // create
    const clubCreated = new clubModel(data);
    await clubCreated.save();
    if (!clubCreated) throw createError.InternalServerError("ثبت باشگاه جدید با خطا مواجه شد");

    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "باشگاه با موفقیت ثبت شد",
      data,
    });
  }
  async updateClub(req, res, next) {
    await this.checkExistClub(req.params.id);

    const data = copyObject(req.body);
    deleteInvalidPropertyInObject(data, ["sportID"]);

    // validate
    await clubSchemaUpdate.validateAsync(data);

    const { name } = data;

    // find club
    const clubFound = await clubModel.findOne({ name });
    if (clubFound) throw createError.Conflict("نام باشگاه تکراری است");

    // update
    const clubUpdated = await clubModel.updateOne({ _id: req.params.id }, data);
    if (!clubUpdated.modifiedCount) throw createError.InternalServerError("بروزرسانی باشگاه با خطا مواجه شد");

    res.status(StatusCodes.CREATED).json({
      status: "success",
      message: "بروزرسانی باشگاه با موفقیت انجام شد",
    });
  }
  async getClubs(req, res, next) {
    const clubFound = await clubModel.find({}).populate("sportID").lean();
    if (!clubFound) throw createError.InternalServerError("دریافت اطلاعات با خطا مواجه شد");
    res.status(StatusCodes.OK).json({
      status: "success",
      message: "دریافت اطلاعات با موفقیت انجام شد",
      data: clubFound,
    });
  }
  async getClub(req, res, next) {
    const clubFound = await this.checkExistClub(req.params.id);

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "دریافت اطلاعات با موفقیت انجام شد",
      data: clubFound,
    });
  }
  async deleteClub(req, res, next) {
    await this.checkExistClub(req.params.id);

    const deletedClub = await clubModel.deleteOne({ _id: req.params.id });
    if (!deletedClub.deletedCount) throw createError.InternalServerError("حذف باشگاه با خطا مواجه شد");

    await studentModel.updateMany({ clubID: req.params.id }, { $unset: { clubID: 1 } });

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "حذف باشگاه با موفقیت انجام شد",
    });
  }
  async addSportToClub(req, res, next) {
    const data = copyObject(req.body);
    console.log(req.body);
    const blackListFields = ["name", "gender", "address", "phone"];
    deleteInvalidPropertyInObject(data, blackListFields);

    // validate
    await this.checkExistClub(req.params.id);

    const { sportID } = data;
    // find Sport
    for (const i in sportID) {
      if (typeof sportID == "string") {
        if (!isValidObjectId(sportID)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");
        const sportFound = await sportModel.findById(sportID);
        if (!sportFound) throw createError.NotFound("رشته ورزشی وارد شده معتبر نمی باشد");
      } else {
        if (!isValidObjectId(sportID[i])) throw createError.BadRequest("شناسه رشته ورزشی وارد شده معتبر نمی باشد");
        const sportFound = await sportModel.findById(sportID[i]);
        if (!sportFound) sportID.splice(i, 1);
      }
    }

    // update
    const clubUpdated = await clubModel.updateOne({ _id: req.params.id }, { $addToSet: { sportID } });
    if (!clubUpdated.modifiedCount) throw createError.InternalServerError("ایجاد رشته ورزشی با خطا مواجه شد");

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "رشته ورزشی مورد نظر با موفقیت به باشگاه اضافه شد",
    });
  }
  async removeSportToClub(req, res, next) {
    const data = copyObject(req.body);
    const blackListFields = ["name", "gender", "address", "phone"];
    deleteInvalidPropertyInObject(data, blackListFields);

    const { id: clubID, sportID } = req.params;

    // validate
    if (!isValidObjectId(sportID)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

    // find club
    const clubFound = await this.checkExistClub(clubID);

    // find sport
    if (sportID) {
      const sportFound = await sportModel.findById(sportID).lean();
      if (!sportFound) throw createError.NotFound("شناسه رشته ورزشی معتبر نمی باشد");
    }

    // check Sport in Club
    if (!clubFound.sportID.includes(sportID)) throw createError.NotFound("رشته ورزشی وارد شده یافت نشد");

    // remove Sport
    clubFound.sportID.pull(sportID);
    clubFound.save();

    res.status(StatusCodes.OK).json({
      status: "success",
      message: "رشته ورزشی مورد نظر با موفقیت از باشگاه حذف شد",
    });
  }
  async checkExistClub(id) {
    if (!isValidObjectId(id)) throw createError.BadRequest("شناسه وارد شده معتبر نمی باشد");

    // find age group
    const clubFound = await clubModel.findById(id);
    if (!clubFound) throw createError.NotFound("باشگاه وارد شده یافت نشد");
    return clubFound;
  }
}

module.exports = new ClubController();
