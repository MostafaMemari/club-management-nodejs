const autoBind = require("auto-bind");

class StudentController {
  constructor() {
    autoBind(this);
  }
  async register(req, res, next) {
    try {
      res.locals.layout = "./layouts/panel/student/register.ejs";
      res.render("./pages/panel/student/register.ejs");
    } catch (error) {
      next(error);
    }
  }
  async student(req, res, next) {
    try {
      res.locals.layout = "./layouts/panel/add-student.ejs";
      res.render("./pages/panel/add-student.ejs");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new StudentController();
