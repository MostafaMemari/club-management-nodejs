function NotFoundErrorHandler(req, res, next) {
  const errorCode = 404;
  const message = "Not Found Page";

  res.status(errorCode).json({
    status: errorCode,
    message,
  });
}
function ApiErrorHandler(error, req, res, next) {
  const errorCode = error.status || 500;
  const message = error.message || "internal server error";

  res.status(errorCode).json({
    status: errorCode,
    ...error,
    message,
  });
}

module.exports = { NotFoundErrorHandler, ApiErrorHandler };

// export function errorHandler(dto: any) {
//   let errors: ValidationError[] = [];
//   for (const i in dto) {
//     const error: any = validateSync(dto[i]);
//     errors.push(...error);
//   }
//   let errorTexts: any[] = [];
//   for (const errorItem of errors) {
//     errorTexts = errorTexts.concat(errorItem.constraints);
//   }

//   if (errorTexts.length > 0) throw { ...createHttpError.BadRequest(), errorTexts };

//   return errorTexts;
// }
