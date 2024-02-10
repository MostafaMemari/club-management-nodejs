const mongoose = require("mongoose");

const sportSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    type: { type: String },
    description: { type: String },
  },
  { versionKey: false }
);

const sportModel = mongoose.model("sport", sportSchema);

module.exports = {
  sportModel,
};
