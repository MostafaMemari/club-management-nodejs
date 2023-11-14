const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports.generateToken = (payload) => {
  const secretKey = process.env.SECRET_KEY;
  return jwt.sign(payload, secretKey, { expiresIn: "1w" });
};

module.exports.verifyToken = (token) => {
  const secretKey = process.env.SECRET_KEY;
  return jwt.verify(token, secretKey, (error, decoded) => {
    if (error) throw createError.Unauthorized("لطفا وارد حساب کاربری خود شوید");
    return decoded;
  });
};
