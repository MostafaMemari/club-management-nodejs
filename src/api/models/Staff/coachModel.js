const mongoose = require("mongoose");

const coachSchema = new mongoose.Schema(
  {
    firstName: { tpye: String, required: true },
    lastName: { tpye: String, required: true },
    nationalID: { tpye: Number, required: true },
    role: { tpye: String, default: "Coach" },
    birthday: { type: Date, required: true },

    image_url: { tpye: String },
    memberShipValidity: { tpye: Number },
    address: { type: String },
    phone: { tpye: Number },
    mobile: { tpye: Number },
    registerDate: { type: Date },

    clubID: { type: Types.ObjectId, ref: "club" },
    beltID: { type: Types.ObjectId, ref: "belt" },
    createdBy: { type: Types.ObjectId },
  },
  { timestamps: true, versionKey: false }
);

const coachModel = mongoose.model("coach", coachSchema);

module.exports = {
  coachModel,
};
