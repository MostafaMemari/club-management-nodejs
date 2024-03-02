const asyncHandler = require("express-async-handler");
const { verifyToken } = require("../services/tokenServices");
const createHttpError = require("http-errors");
const { StudentModel } = require("../../modules/student/student.model");
const { CoachModel } = require("../../modules/coach/coach.model");
const { UserModel } = require("../../modules/user/user.model");

function getToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) return token;
  throw createHttpError.Unauthorized("please login your account");
}

module.exports.isAuth = asyncHandler(async (req, res, next) => {
  const token = getToken(req?.headers);
  const verifiedToken = verifyToken(token);
  let user = await UserModel.findById(verifiedToken.id).select("role _id clubs");
  if (!user) user = await CoachModel.findById(verifiedToken.id).select("role _id clubs");
  if (!user) user = await StudentModel.findById(verifiedToken.id).select("role _id");
  if (!user) throw createHttpError.Unauthorized("user a not found");

  req.userAuth = user;
  next();
});
