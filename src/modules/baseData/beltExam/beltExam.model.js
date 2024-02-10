const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../../common/utils/dateConvarter");
const { string, required } = require("joi");

const { Types } = mongoose;

const BeltExamSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    eventPlace: { type: String },
    genders: {
      type: Array,
      required: true,
      validate: {
        validator: function (v) {
          const allowedValues = ["آقایان", "بانوان"];
          return v.every((value) => allowedValues.includes(value));
        },
        message: "مقادیر gender باید فقط شامل 'آقایان' یا 'بانوان' باشد.",
      },
    },
    belts: [{ type: Types.ObjectId, ref: "belt" }],
    eventDate: { type: String, required: true },
    registerDate: { type: String, required: true },
    eventDateMiladi: {
      type: Date,
      default: function () {
        return shamsiToMiladi(this.eventDate);
      },
    },
    registerDateMiladi: {
      type: Date,
      default: function () {
        return shamsiToMiladi(this.registerDate);
      },
    },
  },
  { versionKey: false }
);

BeltExamSchema.pre("updateOne", function (next) {
  const { eventDate, registerDate } = this._update;

  if (eventDate) {
    this.eventDateMiladi = shamsiToMiladi(eventDate);
    this.set({ eventDateMiladi: this.eventDateMiladi });
  }
  if (registerDate) {
    this.registerDateMiladi = shamsiToMiladi(registerDate);
    this.set({ registerDateMiladi: this.registerDateMiladi });
  }
  next();
});

const BeltExamModel = mongoose.model("beltExam", BeltExamSchema);

module.exports = {
  BeltExamModel,
};
