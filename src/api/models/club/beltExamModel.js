const mongoose = require("mongoose");

const { Types } = mongoose;

const beltExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    beltID: [{ type: Types.ObjectId, ref: "belt" }],
    eventDate: { type: Date, required: true },
    registerDate: { type: Date, required: true },
  },
  { versionKey: false }
);

const beltExamModel = mongoose.model("beltExam", beltExamSchema);

module.exports = {
  beltExamModel,
};
