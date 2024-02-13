const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../../common/utils/dateConvarter");

const AgeGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
  },
  { versionKey: false }
);

const AgeGroupModel = mongoose.model("ageGroup", AgeGroupSchema);

module.exports = {
  AgeGroupModel,
};
