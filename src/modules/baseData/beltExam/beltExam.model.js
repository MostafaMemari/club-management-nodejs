const mongoose = require("mongoose");

const { Types, Schema, model } = mongoose;

const BeltExamSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    eventPlace: [{ type: String }],
    genders: {
      type: Array,
      required: true,
      validate: {
        validator: function (v) {
          const allowedGenders = ["آقایان", "بانوان"];
          return v.every((value) => allowedGenders.includes(value));
        },
      },
    },
    belts: [{ type: Types.ObjectId, ref: "belt" }],
    eventDate: { type: String, required: true },
    registerDate: { type: String, required: true },
  },
  { versionKey: false }
);

const BeltExamModel = model("beltExam", BeltExamSchema);

module.exports = {
  BeltExamModel,
};
