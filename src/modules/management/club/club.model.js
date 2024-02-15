const mongoose = require("mongoose");

const { Types } = mongoose;

const ClubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
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
    sports: { type: [Types.ObjectId], ref: "sport", required: true },

    address: { type: String },
    phone: { type: String },

    // createdBy: [{ type: Types.ObjectId, ref: "", required: true }],
  },
  { versionKey: false }
);

const ClubModel = mongoose.model("club", ClubSchema);

module.exports = {
  ClubModel,
};
