const AsyncHandler = require("express-async-handler");
const { studentFound } = require("./Personnel/studentController");
module.exports.loginEjs = AsyncHandler((req, res) => {
  res.render("login");
});
module.exports.dashboardUserEjs = AsyncHandler(async (req, res) => {
  const studentProfile = await studentFound(req.userAuth._id);
  res.render("dashboard", studentProfile);
});
