const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../helpers/dateConvarter");

const { Types } = mongoose;

const beltExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    eventPlace: { type: String },
    gender: { type: String, enum: ["آقایان", "بانوان"], default: "آقایان" },
    beltID: [{ type: Types.ObjectId, ref: "belt" }],
    eventDateIR: { type: String, required: true },
    registerDateIR: { type: String, required: true },
    eventDateEN: { type: Date },
    registerDateEN: { type: Date },
  },
  { versionKey: false }
);

beltExamSchema.pre("save", function (next) {
  this.eventDateEN = shamsiToMiladi(this.eventDateIR);
  this.registerDateEN = shamsiToMiladi(this.registerDateIR);
  next();
});

const beltExamModel = mongoose.model("beltExam", beltExamSchema);

module.exports = {
  beltExamModel,
};
