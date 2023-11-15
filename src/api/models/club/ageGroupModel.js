const mongoose = require("mongoose");
var moment = require("jalali-moment");

const ageGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    fromDateIR: { type: String, required: true },
    toDateIR: { type: String, required: true },
    fromDateEN: { type: Date },
    toDateEN: { type: Date },
  },
  { versionKey: false }
);

ageGroupSchema.pre("save", function (next) {
  this.fromDateEN = moment.from(this.fromDateIR, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");
  this.toDateEN = moment.from(this.toDateIR, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");

  next();
});
ageGroupSchema.pre("updateOne", function (next) {
  const { fromDateIR, toDateIR } = this._update;

  if (fromDateIR) {
    this.fromDateEN = moment.from(fromDateIR, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");
    this.set({ fromDateEN: this.fromDateEN });
  }
  if (toDateIR) {
    this.toDateEN = moment.from(toDateIR, "fa", "YYYY/MM/DD").format("YYYY/MM/DD");
    this.set({ toDateEN: this.toDateEN });
  }

  next();
});

const ageGroupModel = mongoose.model("ageGroup", ageGroupSchema);

module.exports = {
  ageGroupModel,
};
