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
  },
  { versionKey: false }
);

const BeltExamModel = mongoose.model("beltExam", BeltExamSchema);

module.exports = {
  BeltExamModel,
};
