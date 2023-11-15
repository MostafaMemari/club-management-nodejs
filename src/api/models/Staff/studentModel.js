const mongoose = require("mongoose");

const { Types } = mongoose;

const studentSchema = new mongoose.Schema(
  {
    firstName: { tpye: String, required: true },
    lastName: { tpye: String, required: true },
    nationalID: { tpye: Number, required: true },
    role: { tpye: String, default: "Student" },
    gender: { type: String, enum: ["آقایان", "بانوان"], default: "آقایان" },

    phone: { tpye: Number },
    imageUrl: { tpye: String },
    memberShipValidity: { tpye: Number },
    address: { type: String },
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

const studentModel = mongoose.model("student", studentSchema);

module.exports = {
  studentModel,
};
