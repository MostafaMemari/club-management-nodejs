const { validationResult } = require("express-validator");
const createHttpError = require("http-errors");

function validate(req, res, next) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = {};

      for (const error of result.errors) {
        errors[error.path] = error.msg;
      }
      throw createHttpError.BadRequest(errors);
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = {
  validate,
};
