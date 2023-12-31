const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const expressEjsLayouts = require("express-ejs-layouts");

const createError = require("http-errors");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./config/db");
const { AllRouter } = require("./api/routes/router");

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
    this.#app.use(cors());
    // this.#app.use(morgan("short"));
    this.#app.use(express.urlencoded({ extended: false }));
    this.#app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

    this.#app.use(express.json());
    // this.#app.use("/static", express.static(path.join(__dirname, "..", "public")));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));

    // this.#app.use(expressEjsLayouts);
    this.#app.set("view engine", "ejs");
    this.#app.set("views", path.join(__dirname, "..", "views"));
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
          status: "failed",
          message,
        },
      });
    });
  }
};
