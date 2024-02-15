const mongoose = require("mongoose");

const { Types, Schema } = mongoose;

const CoachSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalID: { type: String, required: true, unique: true },
    fatherName: { type: String },
    gender: { type: String, enum: ["مرد", "زن"], default: "مرد" },
    role: { type: String, default: "COACH" },
    mobile: { type: String },
    address: { type: String },
    birthDay: { type: String },
    registerDate: { type: String },
    imageUrl: { type: String, default: "/uploads/profile-coachs.jpg" },

    memberShipValidity: { type: Number },

    clubs: { type: [Types.ObjectId], ref: "club" },
    belt: { type: Types.ObjectId, ref: "belt" },

    // createdBy: { type: Types.ObjectId },
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
