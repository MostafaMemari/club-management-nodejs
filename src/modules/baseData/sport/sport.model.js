const mongoose = require("mongoose");

const SportSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    type: { type: String },
    description: { type: String },
  },
  { versionKey: false }
);

const SportModel = mongoose.model("sport", SportSchema);

module.exports = {
  SportModel,
};
