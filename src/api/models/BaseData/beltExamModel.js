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
    eventDateEN: {
      type: Date,
      default: function () {
        return shamsiToMiladi(this.eventDateIR);
      },
    },
    registerDateEN: {
      type: Date,
      default: function () {
        return shamsiToMiladi(this.registerDateIR);
      },
    },
  },
  { versionKey: false }
);

beltExamSchema.pre("updateOne", function (next) {
  const { eventDateIR, registerDateIR } = this._update;

  if (eventDateIR) {
    this.eventDateEN = shamsiToMiladi(eventDateIR);
    this.set({ eventDateEN: this.eventDateEN });
  }
  if (registerDateIR) {
    this.registerDateEN = shamsiToMiladi(registerDateIR);
    this.set({ registerDateEN: this.registerDateEN });
  }
  next();
});

const beltExamModel = mongoose.model("beltExam", beltExamSchema);

module.exports = {
  beltExamModel,
};
