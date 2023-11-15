const mongoose = require("mongoose");

const { Types } = mongoose;

const clubSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    gender: { type: String, enum: ["مرد", "زن"], default: "مرد" },
    address: { type: String },
    phone: { type: String },

    sportID: [{ type: Types.ObjectId, required: true }],
  },
  { versionKey: false }
);

const clubModel = mongoose.model("club", clubSchema);

module.exports = {
  clubModel,
};
