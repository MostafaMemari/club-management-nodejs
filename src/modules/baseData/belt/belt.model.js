const { Schema, Types, model } = require("mongoose");

const BeltSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    duration: { type: Number, required: true },
    nextBelt: { type: [Types.ObjectId], ref: "belt" },
    underYear: { type: Number },
    upperYear: { type: Number },
  },
  { versionKey: false }
);

const BeltModel = model("belt", BeltSchema);

module.exports = {
  BeltModel,
};
