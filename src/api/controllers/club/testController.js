const { normalizenationalID } = require("../../helpers/normalizeData");
const { beltModel } = require("../../models/club/beltModel");
const { studentModel } = require("../../models/staff/studentModel");

module.exports.insertStudetnsJSON = async (req, res, next) => {
  try {
    const students = require("../../../../students.json");
    console.log(students);

    for (const i in students) {
      const name = students[i].name;
      const belt_ID = await beltModel.findOne({ name: students[i].beltID });

      const firstName = name.slice(0, name.indexOf(" ")).replace("ي", "ی").trim();
      const lastName = name.slice(name.indexOf(" "), name.length).replace("ي", "ی").trim();
      const nationalID = normalizenationalID(String(students[i].nationalID));
      const birthDayIR = students[i].birthDayIR;
      const beltID = belt_ID._id;
      const beltDateIR = students[i].beltDateIR;
      const memberShipValidity = students[i].memberShipValidity;
      const clubID = "655486e19a2bddaf16c4932a";

      await studentModel.create({
        firstName,
        lastName,
        nationalID,
        birthDayIR,
        beltID,
        beltDateIR,
        memberShipValidity,
        clubID,
      });
    }
    res.end();
  } catch (error) {
    next(error);
  }
};
