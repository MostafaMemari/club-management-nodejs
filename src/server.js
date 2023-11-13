const express = require("express");
const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { AllRouter } = require("./api/routes/router");
const { connectToMongoDB } = require("./config/db");
require("dotenv").config();

module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URL;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URI;

    this.createServer();
    this.connectToDatabase();
    this.configApplication();
    this.errorHandling();
  }

  configApplication() {}
  createServer() {
    this.#app.listen(this.#PORT, () => {
      console.log("run > http://localhost:" + this.#PORT);
    });
  }
  connectToDatabase() {
    connectToMongoDB(this.#DB_URL);
  }

  createRoutes() {
    this.#app.use(AllRouter);
  }
  errorHandling() {
    this.#app.use((req, res, next) => {
      next(createHttpError.NotFound("صفحه مورد نظر یافت نشد !"));
    });

    this.#app.use((error, req, res, next) => {
      const serverError = createHttpError.InternalServerError;

      const statusCode = error.status || serverError.status;
      const message = error.message || serverError.message;

      return res.status(statusCode).json({
        errors: {
          statusCode,
          message,
        },
      });
    });
  }
};
