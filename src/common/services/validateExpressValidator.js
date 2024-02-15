const { validationResult } = require("express-validator");
const createHttpError = require("http-errors");

function validate(req) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const errors = {};

    for (const error of result.errors) {
      errors[error.path] = error.msg;
    }
    throw createHttpError.BadRequest(errors);
  }
}

module.exports = {
  validate,
};
