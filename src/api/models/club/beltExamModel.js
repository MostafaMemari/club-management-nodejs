const mongoose = require("mongoose");
var moment = require("jalali-moment");

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
  this.eventDateEN = moment.from(this.eventDateIR, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");
  this.registerDateEN = moment.from(this.registerDateIR, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");

  next();
});

const beltExamModel = mongoose.model("beltExam", beltExamSchema);

module.exports = {
  beltExamModel,
};
