const { registerStudent, getStudents, updateStudent, getStudent } = require("../../controllers/staff/studentController");

const studentRouter = require("express").Router();

studentRouter.get("/", getStudents);
studentRouter.route("/:id").put(updateStudent).get(getStudent);

studentRouter.post("/register", registerStudent);

module.exports = { studentRouter };
