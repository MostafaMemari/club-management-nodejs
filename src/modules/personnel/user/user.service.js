const createHttpError = require("http-errors");
const { isValidObjectId } = require("mongoose");
const { UserModel } = require("./user.model");
const { UserMessage } = require("./user.message");
const { hashPassword, comparePassword } = require("../../../common/services/passwordServices");
const { generateJWTToken } = require("../../../common/services/tokenServices");

class UserService {
  async register(bodyData) {
    const { username, password, email } = bodyData;

    const hashedPassword = await hashPassword(password);

    const userCreated = await UserModel.create({ username, password: hashedPassword, email });
    if (!userCreated) throw createHttpError.InternalServerError(UserMessage.RegisterError);
    return userCreated;
  }
  async login(identifier, password) {
    const userExist = await UserModel.findOne({ $or: [{ username: identifier }, { email: identifier }] });
    if (!userExist) throw createHttpError.Unauthorized(UserMessage.Unauthorized);

    const isPasswordValid = await comparePassword(password, userExist.password);
    if (!isPasswordValid) throw createHttpError.Unauthorized(UserMessage.Unauthorized);

    const accessToken = await generateJWTToken({ id: userExist._id });

    return accessToken;
  }

  // async find() {
  //   const ageGroupDB = await AgeGroupModel.find({}).lean();
  //   const students = await UserModel.aggregate([
  //     {
  //       $match: {},
  //     },
  //     {
  //       $limit: 50,
  //     },
  //     {
  //       $addFields: {
  //         ageGroups: {
  //           $function: {
  //             body: assignAgeGroups,
  //             args: ["$birthDayMiladi", ageGroupDB],
  //             lang: "js",
  //           },
  //         },
  //       },
  //     },
  //   ]);

  //   if (!students) throw createHttpError.InternalServerError("دریافت رده سنی با خطا مواجه شد");
  //   return students;
  // }

  // async update(bodyData, paramData) {
  //   await this.checkExistUserByID(paramData.id);
  //   const studentCreated = await UserModel.updateOne({ _id: paramData.id }, { ...bodyData });
  //   if (!studentCreated.modifiedCount) throw createHttpError.InternalServerError("بروزرسانی اطلاعات با خطا مواجه شد");
  // }
  // async findByID(studentID) {
  //   const student = await UserModel.aggregate([
  //     {
  //       $match: { _id: new Types.ObjectId(studentID) },
  //     },
  //     {
  //       $lookup: {
  //         from: "belts",
  //         localField: "belt",
  //         foreignField: "_id",
  //         as: "belt",
  //       },
  //     },
  //     { $unwind: "$belt" },
  //     {
  //       $addFields: {
  //         "belt.nextBeltDate": {
  //           $function: {
  //             body: getNextBeltDate,
  //             args: ["$beltDate", "$belt.duration"],
  //             lang: "js",
  //           },
  //         },
  //         "belt.beltDate": "$beltDate",
  //       },
  //     },
  //     {
  //       $project: {
  //         "belt.nextBelt": 0,
  //         "belt.duration": 0,
  //       },
  //     },
  //   ]);

  //   if (!student) throw createHttpError.InternalServerError("دریافت رده سنی با خطا مواجه شد");
  //   return student;
  // }
  // async remove(studentID) {
  //   const removeResult = await UserModel.deleteOne({ _id: studentID });
  //   if (!removeResult.deletedCount) throw createHttpError.InternalServerError(UserMessage.DeleteError);
  // }

  async checkExistUserByUsername(username) {
    const result = await UserModel.findOne({ username }).lean();
    if (result) throw createHttpError.Conflict("username already taken");
  }
  async checkExistUserByEmail(email) {
    const result = await UserModel.findOne({ email }).lean();
    if (result) throw createHttpError.Conflict("email already registered");
  }

  async checkExistUserByID(userID) {
    if (!isValidObjectId(userID)) throw createHttpError.InternalServerError("user object id is not valid");
    const result = await UserModel.findById(userID).lean();
    if (!result) throw createHttpError.NotFound(UserMessage.NotFound);
    return result;
  }
}

module.exports = new UserService();
