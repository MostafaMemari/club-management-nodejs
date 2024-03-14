const autoBind = require("auto-bind");
const studentService = require("../../../student/student.service");
const beltService = require("../../../baseData/belt/belt.service");
const ageGroupService = require("../../../baseData/ageGroup/ageGroup.service");

class AdminController {
  #studentService;
  #beltService;
  #ageGroupSerivce;
  constructor() {
    autoBind(this);
    this.#studentService = studentService;
    this.#beltService = beltService;
    this.#ageGroupSerivce = ageGroupService;
  }
  async registerStudent(req, res, next) {
    try {
      res.locals.layout = "./layouts/panel/admin/student/register.ejs";
      res.render("./pages/panel/admin/student/register.ejs");
    } catch (error) {
      next(error);
    }
  }
  async listStudent(req, res, next) {
    try {
      const students = await this.#studentService.find();
      const belts = await this.#beltService.find();
      const ageGroups = await this.#ageGroupSerivce.find();

      res.locals.layout = "./layouts/panel/admin/student/list.ejs";
      res.render("./pages/panel/admin/student/list.ejs", { students, belts, ageGroups });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AdminController();
