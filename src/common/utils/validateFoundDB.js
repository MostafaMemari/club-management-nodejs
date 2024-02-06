const { beltModel } = require("../models/BaseData/beltModel");
const { clubModel } = require("../models/Management/clubModel");
const { coachModel } = require("../models/Personnel/coachModel");
const { studentModel } = require("../../modules/personnel/student/studentModel");
const createError = require("http-errors");
const { normalizenationalID } = require("./normalizeData");
const studentController = require("../../modules/personnel/student/studentController");
const clubController = require("../controllers/Management/clubController");
const coachController = require("../controllers/Personnel/coachController");
const beltController = require("../controllers/BaseData/beltController");

module.exports.validate_nationalId_clubId_coachId_beltId = async (nationalID, clubID, coachID, beltID) => {
  await studentController.checkExistStudentByNationalId(nationalID);
  await clubController.checkExistClub(clubID);
  await coachController.checkExistCoach(coachID);
  await beltController.checkExistBelts(beltID);
};
