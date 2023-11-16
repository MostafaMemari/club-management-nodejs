const { registerStudent, getStudents } = require("../../controllers/staff/studentController");

const studentRouter = require("express").Router();

studentRouter.get("/", getStudents);
studentRouter.post("/register", registerStudent);

module.exports = { studentRouter };
