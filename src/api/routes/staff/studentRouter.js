const { registerStudent, getStudents, updateStudent, getStudent, deleteStudent } = require("../../controllers/staff/studentController");
const { uploadMulter } = require("../../services/multer");

const studentRouter = require("express").Router();

studentRouter.get("/", getStudents);
studentRouter.route("/:id").put(updateStudent).get(getStudent).delete(deleteStudent);

studentRouter.post("/register", uploadMulter.single("image"), registerStudent);

module.exports = { studentRouter };
