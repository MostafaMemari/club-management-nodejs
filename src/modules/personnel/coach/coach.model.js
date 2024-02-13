const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../../common/utils/dateConvarter");

const { Types } = mongoose;

const CoachSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    nationalID: { type: String, required: true, unique: true },

    memberShipValidity: { type: Number },

    role: { type: String, default: "COACH" },
    gender: { type: String, enum: ["مرد", "زن"], default: "مرد" },
    imageUrl: { type: String, default: "uploads/profile-coachs.jpg" },

    mobile: { type: String },
    fatherName: { type: String },
    address: { type: String },

    birthDay: { type: String },
    registerDate: { type: String },

    clubID: { type: Types.ObjectId, ref: "club" },
    beltID: { type: Types.ObjectId, ref: "belt" },
    createdBy: { type: Types.ObjectId },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CoachModel = mongoose.model("coach", CoachSchema);

module.exports = {
  CoachModel,
};
