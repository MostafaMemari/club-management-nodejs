const mongoose = require("mongoose");

const beltSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
  },
  { versionKey: false }
);

const beltModel = mongoose.model("belt", beltSchema);

module.exports = {
  beltModel,
};
