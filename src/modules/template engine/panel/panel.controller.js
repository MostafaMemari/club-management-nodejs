const autoBind = require("auto-bind");
const studentService = require("../../student/student.service");
const userService = require("../../user/user.service");
const { UserModel } = require("../../user/user.model");

class PanelController {
  #studentService;
  #UserModel;
  constructor() {
    autoBind(this);
    this.#studentService = studentService;
    this.#UserModel = UserModel;
  }
  async main(req, res, next) {
    try {
      const userAuth = req.userAuth;
      if (userAuth.role === "STUDENT") {
        const student = await this.#studentService.findByID(userAuth._id);
        res.render("./pages/panel/student/profile.ejs", { student });
      } else if (userAuth.role === "ADMIN_CLUB") {
        const tes = await this.#UserModel.findById(userAuth._id).populate({ path: "coachs", strictPopulate: false }).populate("clubs").lean();
        console.log(tes);
        res.render("./pages/panel/main.ejs");
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new PanelController();
