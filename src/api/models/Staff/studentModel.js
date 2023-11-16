const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../helpers/dateConvarter");
const { assignAgeGroupsByBirthDay } = require("../../helpers/function");

const { Types } = mongoose;

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    nationalID: { type: String },

    memberShipValidity: { type: Number },

    role: { type: String, default: "Student" },
    gender: { type: String, enum: ["مرد", "زن"], default: "مرد" },
    imageUrl: { type: String, default: "profile.jpg" },

    mobile: { type: String },
    fatherName: { type: String },
    address: { type: String },
    phone: { type: String },

    birthDayIR: { type: String },
    registerDateIR: { type: String },
    birthDayEN: { type: Date },
    registerDateEN: { type: Date },

    clubID: { type: Types.ObjectId, ref: "club" },
    beltID: { type: Types.ObjectId, ref: "belt" },

    ageGroupID: [{ type: Types.ObjectId, ref: "ageGroup" }],

    coachID: { type: Types.ObjectId, ref: "coach" },
    createdBy: { type: Types.ObjectId },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

studentSchema.pre("save", async function () {
  const { birthDayIR, registerDateIR } = this;

  registerDateIR ? (this.registerDateEN = shamsiToMiladi(registerDateIR)) : false;

  if (birthDayIR) {
    this.birthDayEN = shamsiToMiladi(birthDayIR);
    this.ageGroupID = await assignAgeGroupsByBirthDay(this.birthDayEN);
  }
});

const studentModel = mongoose.model("student", studentSchema);

module.exports = {
  studentModel,
};
