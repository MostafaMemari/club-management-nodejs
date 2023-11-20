const {
  getStudents,
  updateStudent,
  getStudent,
  deleteStudent,
  registerStudent,
} = require("../../controllers/Management/studentController");
const { advancedResult } = require("../../middlewares/advancedResult");
const { uploadMulter } = require("../../services/multer");

const studentRouter = require("express").Router();

// advancedResult(studentModel),
studentRouter.get("/", getStudents);

studentRouter.route("/:id").put(updateStudent).get(getStudent).delete(deleteStudent);

studentRouter.post("/register", uploadMulter.single("image"), registerStudent);

module.exports = { studentRouter };
