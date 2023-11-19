const { clubModel } = require("../models/club/clubModel");
const { studentModel } = require("../models/staff/studentModel");
const { coachModel } = require("../models/staff/coachModel");
const { beltModel } = require("../models/club/beltModel");
module.exports.validate_nationalId_clubId_coachId_beltId = async (nationalID, clubID, coachID, beltID) => {
  // find student By nationalID
  if (nationalID) {
    const studentFound = await studentModel.findOne({ nationalID });
    if (studentFound) throw createError.Conflict("کد ملی وارد شده تکراری است");
  }
  // find club
  if (clubID) {
    const clubFound = await clubModel.findById(clubID);
    if (!clubFound) throw createError.NotFound("باشگاه مورد نظر یافت نشد");
  }
  //find coach
  if (coachID) {
    const coachFound = await coachModel.findById(coachID);
    if (!coachFound) throw createError.NotFound("مربی مورد نظر یافت نشد");
  }
  //find belt
  if (beltID) {
    const beltFound = await beltModel.findById(beltID);
    if (!beltFound) throw createError.NotFound("کمربند مورد نظر یافت نشد");
  }
};
