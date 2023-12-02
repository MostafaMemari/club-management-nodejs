const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { verifyToken } = require("../services/tokenServices");
const { userModel } = require("../models/Personnel/userModel");
const { coachModel } = require("../models/Personnel/coachModel");
const { studentModel } = require("../models/Personnel/studentModel");

function getToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) return token;
  throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
}

module.exports.isAuth = asyncHandler(async (req, res, next) => {
  // console.log(req.cookies.access_token);
  // console.log(req?.headers);
  // const token = getToken(req?.headers);

  const verifiedToken = verifyToken(req.cookies.access_token);
  // const verifiedToken = verifyToken(token);
  let user = await userModel.findById(verifiedToken.id).select("role _id");
  if (!user) user = await coachModel.findById(verifiedToken.id).select("role _id");
  if (!user) user = await studentModel.findById(verifiedToken.id).select("role _id");
  if (!user) throw createError.Unauthorized("حساب کاربری یافت نشد");

  req.userAuth = user;
  next();
});
