const mongoose = require("mongoose");

const BeltSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    duration: { type: Number, required: true },
  },
  { versionKey: false }
);

const BeltModel = mongoose.model("belt", BeltSchema);

module.exports = {
  BeltModel,
};
