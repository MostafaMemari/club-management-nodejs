const mongoose = require("mongoose");

const { Types } = mongoose;

const coachSchema = new mongoose.Schema(
  {
    firstName: { tpye: String, required: true },
    lastName: { tpye: String, required: true },
    nationalID: { tpye: Number, required: true },
    role: { tpye: String, default: "Coach" },
    mobile: { tpye: Number },

    gender: { type: String, enum: ["آقایان", "بانوان"], default: "آقایان" },

    imageUrl: { tpye: String },
    memberShipValidity: { tpye: Number },
    address: { type: String },
    registerDate: { type: Date },
    birthday: { type: Date },

    clubID: { type: Types.ObjectId, ref: "club" },
    beltID: { type: Types.ObjectId, ref: "belt" },
    createdBy: { type: Types.ObjectId },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const coachModel = mongoose.model("coach", coachSchema);

module.exports = {
  coachModel,
};
