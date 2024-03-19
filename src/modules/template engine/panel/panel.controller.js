const autoBind = require("auto-bind");
const studentService = require("../../student/student.service");
const userService = require("../../user/user.service");
const { UserModel } = require("../../user/user.model");
const ageGroupService = require("../../baseData/ageGroup/ageGroup.service");
const beltService = require("../../baseData/belt/belt.service");

class PanelController {
  #studentService;
  #UserModel;
  #beltService;
  #ageGroupSerivce;
  constructor() {
    autoBind(this);
    this.#studentService = studentService;
    this.#UserModel = UserModel;
    this.#beltService = beltService;
    this.#ageGroupSerivce = ageGroupService;
  }
  async registerStudent(req, res, next) {
    try {
      const urlPath = "/student/register";
      const userAuth = req.userAuth;

      res.render("./pages/panel/student/register.ejs", { urlPath, userAuth });
    } catch (error) {
      next(error);
    }
  }
  async listStudent(req, res, next) {
    try {
      const urlPath = "/student/list";
      const userAuth = req.userAuth;

      const students = await this.#studentService.find();
      const belts = await this.#beltService.find();
      const ageGroups = await this.#ageGroupSerivce.find();

      res.render("./pages/panel/student/list.ejs", { students, userAuth, belts, ageGroups, urlPath });
    } catch (error) {
      next(error);
    }
  }

  async listClubs(req, res, next) {
    try {
      const urlPath = "/clubs";
      const userAuth = req.userAuth;

      res.render("./pages/panel/club/list.ejs", { userAuth, urlPath });
    } catch (error) {
      next(error);
    }
  }

  async registerCoach(req, res, next) {
    try {
      const userAuth = req.userAuth;
      const urlPath = "/coach/register";
      res.render("./pages/panel/coach/register.ejs", { urlPath, userAuth });
    } catch (error) {
      next(error);
    }
  }

  async main(req, res, next) {
    try {
      const urlPath = "/";
      const userAuth = req.userAuth;
      if (userAuth.role === "STUDENT") {
        const student = await this.#studentService.findByID(userAuth._id);
        res.render("./pages/panel/student/profile.ejs", { student, userAuth, urlPath });
      } else if (userAuth.role === "ADMIN_CLUB") {
        const urlPath = "/";

        // const tes = await this.#UserModel.findById(userAuth._id).populate({ path: "coachs", strictPopulate: false }).populate("clubs").lean();
        const userAuth = req.userAuth;

        res.render("./pages/panel/main.ejs", { userAuth, urlPath });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PanelController();
