const autoBind = require("auto-bind");

class AuthController {
  constructor() {
    autoBind(this);
  }
  async login(req, res, next) {
    try {
      const userAuth = req.userAuth;
      res.locals.layout = "./layouts/auth/main.ejs";
      res.render("./pages/auth/admin-login.ejs", { userAuth });
    } catch (error) {
      next(error);
    }
  }
  async studentLogin(req, res, next) {
    try {
      const userAuth = req.userAuth;
      res.locals.layout = "./layouts/auth/main.ejs";
      res.render("./pages/auth/student-login.ejs", { userAuth });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();
