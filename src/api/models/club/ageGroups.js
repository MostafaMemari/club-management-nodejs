const mongoose = require("mongoose");

const ageGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fromDate: { type: Date, required: true },
    toDate: { type: Date, required: true },
  },
  { versionKey: false }
);

const ageGroupModel = mongoose.model("ageGroup", ageGroupSchema);

module.exports = {
  ageGroupModel,
};
