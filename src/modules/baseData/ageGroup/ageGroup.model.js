const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../../common/utils/dateConvarter");

const AgeGroupSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    fromDate: { type: String, required: true },
    toDate: { type: String, required: true },
    fromDateMiladi: {
      type: Date,
      default: function () {
        return shamsiToMiladi(this.fromDate);
      },
    },
    toDateMiladi: {
      type: Date,
      default: function () {
        return shamsiToMiladi(this.toDate);
      },
    },
  },
  { versionKey: false }
);

AgeGroupSchema.pre("updateOne", function (next) {
  const { fromDate, toDate } = this._update;

  if (fromDate) {
    this.fromDateMiladi = shamsiToMiladi(fromDate);
    this.set({ fromDateMiladi: this.fromDateMiladi });
  }
  if (toDate) {
    this.toDateMiladi = shamsiToMiladi(toDate);
    this.set({ toDateMiladi: this.toDateMiladi });
  }
  next();
});

const AgeGroupModel = mongoose.model("ageGroup", AgeGroupSchema);

module.exports = {
  AgeGroupModel,
};
