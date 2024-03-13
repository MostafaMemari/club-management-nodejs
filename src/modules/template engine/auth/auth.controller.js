const autoBind = require("auto-bind");

class AuthController {
  constructor() {
    autoBind(this);
  }
  async login(req, res, next) {
    try {
      res.locals.layout = "./layouts/auth/main.ejs";
      res.render("./pages/auth/login.ejs");
    } catch (error) {
      next(error);
    }
  }
  async studentLogin(req, res, next) {
    try {
      res.locals.layout = "./layouts/panel/student/login.ejs";
      res.render("./pages/panel/student/login.ejs");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
