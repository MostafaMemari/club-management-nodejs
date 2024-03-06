const autoBind = require("auto-bind");

class PanelController {
  constructor() {
    autoBind(this);
  }
  async main(req, res, next) {
    try {
      res.render("./pages/panel/main.ejs");
    } catch (error) {
      next(error);
    }
  }
  async addStudent(req, res, next) {
    try {
      res.locals.layout = "./layouts/panel/add-student.ejs";
      res.render("./pages/panel/add-student.ejs");
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PanelController();
