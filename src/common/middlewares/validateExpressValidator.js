const { validationResult } = require("express-validator");
const createHttpError = require("http-errors");

function validate(req) {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      const errors = {};

      for (const error of result.errors) {
        errors[error.path] = error.msg;
      }
      throw createHttpError.BadRequest(errors);
    }
  } catch (error) {
    throw error;
  }
}

module.exports = {
  validate,
};
