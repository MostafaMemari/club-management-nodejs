const { registerStudent, getStudents, updateStudent } = require("../../controllers/staff/studentController");

const studentRouter = require("express").Router();

studentRouter.get("/", getStudents);
studentRouter.route("/:id").put(updateStudent);

studentRouter.post("/register", registerStudent);

module.exports = { studentRouter };
