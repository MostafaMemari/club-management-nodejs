const asyncHandler = require("express-async-handler");
const { verifyToken } = require("../services/tokenServices");

module.exports.isAuth = asyncHandler((req, res, next) => {
  const authorization = req?.headers?.authorization;
  const [bearer, token] = authorization?.split(" ");

  if (bearer && bearer.toLowerCase() === "bearer") {
    if (token) verifyToken(token);
    return next();
  }
});
