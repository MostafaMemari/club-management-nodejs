const { registerStudent, getStudents, updateStudent, getStudent, studentImage } = require("../../controllers/staff/studentController");
const { uploadMulter } = require("../../services/multer");

const studentRouter = require("express").Router();

studentRouter.get("/", getStudents);
studentRouter.route("/:id").put(updateStudent).get(getStudent);

studentRouter.post("/register", uploadMulter.single("image"), registerStudent);

module.exports = { studentRouter };
