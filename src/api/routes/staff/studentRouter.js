const { registerStudent } = require("../../controllers/staff/studentController");

const studentRouter = require("express").Router();

studentRouter.post("/register", registerStudent);

module.exports = { studentRouter };
