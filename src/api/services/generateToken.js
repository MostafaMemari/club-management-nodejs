const jwt = require("jsonwebtoken");

module.exports.generateToken = (payload) => {
  const secretKey = process.env.SECRET_KEY;

  const tokenOptions = {
    expiresIn: "1w",
  };
  const token = jwt.sign(payload, secretKey, tokenOptions);

  return token;
};
