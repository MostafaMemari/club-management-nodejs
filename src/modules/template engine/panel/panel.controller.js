const autoBind = require("auto-bind");
const studentService = require("../../student/student.service");
const userService = require("../../user/user.service");
const { UserModel } = require("../../user/user.model");
const ageGroupService = require("../../baseData/ageGroup/ageGroup.service");
const beltService = require("../../baseData/belt/belt.service");
const clubService = require("../../club/club.service");
const { CoachModel } = require("../../coach/coach.model");

class PanelController {
  #studentService;
  #UserModel;
  #beltService;
  #ageGroupSerivce;
  #clubService;
  #coachModel;
  constructor() {
    autoBind(this);
    this.#studentService = studentService;
    this.#UserModel = UserModel;
    this.#beltService = beltService;
    this.#ageGroupSerivce = ageGroupService;
    this.#clubService = clubService;
    this.#coachModel = CoachModel;
  }
  async registerStudent(req, res, next) {
    try {
      const urlPath = req.path;
      const userAuth = req.userAuth;

      res.render("./pages/panel/student/register.ejs", { urlPath, userAuth });
    } catch (error) {
      next(error);
    }
  }
  async listStudent(req, res, next) {
    try {
      const urlPath = req.path;
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
      const urlPath = req.path;
      const userAuth = req.userAuth;

      const clubs = userAuth.role === "ADMIN_CLUB" && (await clubService.getClubsByAdminClubID(userAuth._id));

      res.render("./pages/panel/club/list.ejs", { userAuth, urlPath, clubs });
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
  async listCoachs(req, res, next) {
    try {
      const urlPath = req.path;
      const userAuth = req.userAuth;

      const clubs = await this.#clubService.getClubsByAdminClubID(userAuth._id);
      const clubsArr = clubs.map((club) => club._id);

      const coachs = await this.#coachModel
        .find({ clubs: { $in: clubsArr } })
        .populate({ path: "clubs", strictPopulate: false, select: "name" })
        .populate({ path: "belt", strictPopulate: false, select: "name" })
        .lean();

      const belts = await this.#beltService.find();
      const ageGroups = await this.#ageGroupSerivce.find();

      res.render("./pages/panel/coach/list.ejs", { coachs, userAuth, belts, ageGroups, urlPath });
    } catch (error) {
      next(error);
    }
  }

  async main(req, res, next) {
    try {
      const urlPath = req.path;
      const userAuth = req.userAuth;
      if (userAuth.role === "STUDENT") {
        const student = await this.#studentService.findByID(userAuth._id);
        res.render("./pages/panel/student/profile.ejs", { student, userAuth, urlPath });
      } else if (userAuth.role === "ADMIN_CLUB") {
        const urlPath = req.path;

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
