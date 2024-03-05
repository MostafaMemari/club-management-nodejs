const { CoachModel } = require("../../modules/coach/coach.model");
const { StudentModel } = require("../../modules/student/student.model");
const { UserModel } = require("../../modules/user/user.model");
const { verifyToken } = require("../services/tokenServices");
const createHttpError = require("http-errors");

async function redirectLoginUser(req, res, next) {
  const isLogin = await isLoginUser(req);

  if (isLogin) {
    return res.redirect("/");
  } else {
    // return res.redirect("/login");
    next();
  }
}

async function isLoginUser(req) {
  let isLogin = null;
  const token = req?.cookies?.access_token;
  if (!token) return (isLogin = false);
  const verifiedToken = verifyToken(token);
  let user = await UserModel.findById(verifiedToken.id).select("role _id");
  if (!user) user = await CoachModel.findById(verifiedToken.id).select("role _id clubs");
  if (!user) user = await StudentModel.findById(verifiedToken.id).select("role _id");

  if (user) {
    req.userAuth = user;
    return (isLogin = true);
  }
}

module.exports = { redirectLoginUser };
