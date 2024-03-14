const autoBind = require("auto-bind");
const studentService = require("../../student/student.service");

class PanelController {
  #studentService;
  constructor() {
    autoBind(this);
    this.#studentService = studentService;
  }
  async main(req, res, next) {
    try {
      const userAuth = req.userAuth;

      if (userAuth.role === "STUDENT") {
        const student = await this.#studentService.findByID(userAuth._id);

        res.render("./pages/panel/student/profile.ejs", { student });
      } else if (userAuth.role === "ADMIN_CLUB") {
        res.render("./pages/panel/main.ejs");
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PanelController();
