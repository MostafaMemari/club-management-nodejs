const mongoose = require("mongoose");

const { Types } = mongoose;

const memberSchema = new mongoose.Schema(
  {
    firstName: { tpye: String, required: true },
    lastName: { tpye: String, required: true },
    nationalID: { tpye: Number, required: true },
    role: { tpye: String, default: "Member" },
    image_url: { tpye: String },
    memberShipValidity: { tpye: Number },
    address: { type: String },
    phone: { tpye: Number },
    mobile: { tpye: Number },
    registerDate: { type: Date },
    birthday: { type: Date },

    ageGroups: { type: Types.ObjectId, ref: "ageGroup" },
    coachID: { type: Types.ObjectId, ref: "coach" },
    clubID: { type: Types.ObjectId, ref: "club" },
    beltID: { type: Types.ObjectId, ref: "belt" },
    createdBy: { type: Types.ObjectId },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const memberModel = mongoose.model("member", memberSchema);

module.exports = {
  memberModel,
};
