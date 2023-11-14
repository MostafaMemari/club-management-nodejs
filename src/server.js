const express = require("express");
const createError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { AllRouter } = require("./api/routes/router");
const morgan = require("morgan");
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
    this.configApplication();
    this.createRoutes();
    this.connectToDatabase();
    this.errorHandling();
  }

  configApplication() {
    this.#app.use(express.json());
    this.#app.use(morgan("dev"));
  }
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
      next(createError.NotFound("صفحه مورد نظر یافت نشد"));
    });

    this.#app.use((error, req, res, next) => {
      const serverError = createError.InternalServerError();
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
