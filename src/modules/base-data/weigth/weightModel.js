const { Schema, Types, model } = require("mongoose");

const weightsSchema = new Schema(
  {
    wightLevel: { type: Number },
    maxHeight: { type: Number },
    minHeight: { type: Number },
    minWeight: { type: Number },
    maxWeight: { type: Number },
  },
  { versionKey: false }
);

const weightSchema = new Schema(
  {
    name: { type: String, reuqired: true },
    ageGroup: { type: Types.ObjectId, required: true },
    gender: { type: String, enum: ["مرد", "زن"], default: "مرد" },
    weights: { type: [weightsSchema] },
  },
  { versionKey: false }
);

const weightModel = model("weight", weightSchema);

module.exports = { weightModel };
