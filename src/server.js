const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const path = require("path");
const expressEjsLayouts = require("express-ejs-layouts");

require("dotenv").config();

const cookieParser = require("cookie-parser");
const { connectToMongoDB } = require("./config/mongoose.config");
const { AllRouter } = require("./modules/app.routes");
const { SwaggerConfig } = require("./config/swagger.config");
const { NotFoundErrorHandler, ApiErrorHandler } = require("./common/exception/error.handler");
const { PanelRouter } = require("./modules/template engine/panel/panel.routes");
const { AuthRouter } = require("./modules/template engine/auth/auth.routes");
const session = require("express-session");
const { redirectLoginUser } = require("./common/middlewares/redirectLoginUser");
const flash = require("express-flash");

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
    // this.#app.use(morgan("dev"));
    this.#app.use(
      session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
      })
    );
    this.#app.use(express.urlencoded({ extended: true }));
    this.#app.use(cookieParser(process.env.COOKIE_SECRET_KEY));
    this.#app.use(flash());

    this.#app.use(express.json());
    // this.#app.use("/static", express.static(path.join(__dirname, "..", "public")));
    this.#app.use(express.static(path.join(__dirname, "..", "public")));

    this.#app.use(expressEjsLayouts);
    this.#app.set("view engine", "ejs");
    this.#app.set("layout", "layouts/panel/main.ejs");
  }
  createServer() {
    this.#app.listen(this.#PORT, () => {
      console.log(`Server listen on Port : \n http://localhost:${this.#PORT}/api-docs \n http://localhost:${this.#PORT}/login`);
    });
  }

  createRoutes() {
    this.#app.use("/api/v1", AllRouter);
    this.#app.use("/", AuthRouter);
    this.#app.use("/", PanelRouter);
  }

  errorHandling() {
    this.#app.use(NotFoundErrorHandler);
    this.#app.use(ApiErrorHandler);
  }
};
