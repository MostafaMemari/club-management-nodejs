const mongoose = require("mongoose");

const { Types } = mongoose;

const ClubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["آقایان", "بانوان"], default: "آقایان" },
    address: { type: String },
    phone: { type: String },

    createdBy: [{ type: Types.ObjectId, ref: "", required: true }],

    sportID: [{ type: Types.ObjectId, ref: "sport" }],
  },
  { versionKey: false }
);

const ClubModel = mongoose.model("club", ClubSchema);

module.exports = {
  ClubModel,
};
