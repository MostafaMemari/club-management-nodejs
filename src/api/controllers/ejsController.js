const AsyncHandler = require("express-async-handler");
const studentController = require("./Personnel/studentController");
module.exports.loginEjs = (req, res, next) => {
  res.render("login", { errorMessage: "" });
};
module.exports.dashboardUserEjs = AsyncHandler(async (req, res) => {
  const studentProfile = await studentController.checkExistStudent(req.userAuth._id);
  res.render("dashboard", studentProfile);
});
