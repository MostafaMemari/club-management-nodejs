const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../helpers/dateConvarter");

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
  this.fromDateEN = shamsiToMiladi(this.fromDateIR);
  this.toDateEN = shamsiToMiladi(this.toDateIR);
  next();
});
ageGroupSchema.pre("updateOne", function (next) {
  const { fromDateIR, toDateIR } = this._update;

  if (fromDateIR) {
    this.fromDateEN = shamsiToMiladi(fromDateIR);
    this.set({ fromDateEN: this.fromDateEN });
  }
  if (toDateIR) {
    this.toDateEN = shamsiToMiladi(toDateIR);
    this.set({ toDateEN: this.toDateEN });
  }

  next();
});

const ageGroupModel = mongoose.model("ageGroup", ageGroupSchema);

module.exports = {
  ageGroupModel,
};
