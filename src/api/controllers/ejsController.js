const studentController = require("./Personnel/studentController");
const autoBind = require("auto-bind");

class EjsController {
  constructor() {
    autoBind(this);
  }
  async loginEjs(req, res, next) {
    res.render("login", { errorMessage: "" });
  }
  async dashboardUserEjs(req, res, next) {
    const studentProfile = await studentController.checkExistStudent(req.userAuth._id);
    res.render("dashboard", studentProfile);
  }
}

module.exports = new EjsController();
