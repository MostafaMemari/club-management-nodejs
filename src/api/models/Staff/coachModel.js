const mongoose = require("mongoose");

const { Types } = mongoose;

const coachSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalID: { type: Number, required: true },
    role: { type: String, default: "Coach" },
    mobile: { type: Number },

    gender: { type: String, enum: ["مرد", "زن"], default: "مرد" },

    imageUrl: { type: String },
    memberShipValidity: { type: Number },
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
