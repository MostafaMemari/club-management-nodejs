const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../helpers/dateConvarter");

const { Types } = mongoose;

const coachSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    nationalID: { type: Number, required: true },

    memberShipValidity: { type: Number },

    role: { type: String, default: "Coach" },
    gender: { type: String, enum: ["مرد", "زن"], default: "مرد" },
    imageUrl: { type: String, default: "profile.jpg" },

    mobile: { type: Number },
    fatherName: { type: String },
    address: { type: String },

    birthDayIR: { type: String },
    registerDateIR: { type: String },
    birthDayEN: { type: Date },
    registerDateEN: { type: Date },

    clubID: { type: Types.ObjectId, ref: "club" },
    beltID: { type: Types.ObjectId, ref: "belt" },
    createdBy: { type: Types.ObjectId },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

coachSchema.pre("save", async function () {
  const { birthDayIR, registerDateIR } = this;

  registerDateIR ? (this.registerDateEN = shamsiToMiladi(registerDateIR)) : false;
  birthDayIR ? (this.birthDayEN = shamsiToMiladi(birthDayIR)) : false;
});

const coachModel = mongoose.model("coach", coachSchema);

module.exports = {
  coachModel,
};
