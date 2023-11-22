const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { verifyToken } = require("../services/tokenServices");
const { userModel } = require("../models/Personnel/userModel");

function getToken(headers) {
  const [bearer, token] = headers?.authorization?.split(" ") || [];
  if (token && ["Bearer", "bearer"].includes(bearer)) return token;
  throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
}

module.exports.isAuth = asyncHandler(async (req, res, next) => {
  const token = getToken(req?.headers);
  const verifiedToken = verifyToken(token);
  const user = await userModel.findById(verifiedToken.id).select("-password -createdAt -updatedAt");
  if (!user) user = await coachModel.findById(verifiedToken.id).select("-password -createdAt -updatedAt");
  if (!user) user = await studentModel.findById(verifiedToken.id).select("-password -createdAt -updatedAt");
  if (!user) throw createError.Unauthorized("حساب کاربری یافت نشد");

  req.userAuth = user;
  next();
});
