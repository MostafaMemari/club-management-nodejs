const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const expressEjsLayouts = require("express-ejs-layouts");

const createError = require("http-errors");
require("dotenv").config();

const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./config/mongoose.config");
const { AllRouter } = require("./modules/app.routes");
const { SwaggerConfig } = require("./config/swagger.config");
const { NotFoundErrorHandler, ApiErrorHandler } = require("./common/exception/error.handler");

module.exports = class Application {
  #app = express();
  #PORT;
  #DB_URL;
  constructor(PORT, DB_URI) {
    this.#PORT = PORT;
    this.#DB_URL = DB_URI;

    this.createServer();
    this.configApplication();
    connectToMongoDB(this.#DB_URL);
    this.createRoutes();

    SwaggerConfig(this.#app);
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
      console.log(`Server listen on Port : \n http://localhost:${this.#PORT}/api-docs \n http://localhost:${this.#PORT}/`);
    });
  }

  createRoutes() {
    this.#app.use("/api/v1", AllRouter);
  }

  errorHandling() {
    this.#app.use(NotFoundErrorHandler);
    this.#app.use(ApiErrorHandler);
  }
};
