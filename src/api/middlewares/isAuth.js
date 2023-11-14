const asyncHandler = require("express-async-handler");
const createError = require("http-errors");
const { verifyToken } = require("../services/tokenServices");

module.exports.isAuth = (model, role) => {
  return asyncHandler(async (req, res, next) => {
    const authorization = req?.headers?.authorization;
    if (!authorization) throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");

    const [bearer, token] = authorization?.split(" ");
    if (bearer && bearer.toLowerCase() !== "bearer") throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");

    const verifiedToken = verifyToken(token);

    let user = null;
    if (role) {
      user = await model.findOne({ _id: verifiedToken.id, role }).select("-password -createdAt -updatedAt");
    } else {
      user = await model.findById(verifiedToken.id).select("-password -createdAt -updatedAt");
    }
    if (!user) throw createError.Forbidden("شما دسترسی لازم برای انجام این عملیات را ندارید");
    req.userAuth = user;
    next();
  });
};
