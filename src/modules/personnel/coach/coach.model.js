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

CoachSchema.pre("save", async function () {
  const { birthDayIR, registerDateIR } = this;

  registerDateIR ? (this.registerDateEN = shamsiToMiladi(registerDateIR)) : false;
  birthDayIR ? (this.birthDayEN = shamsiToMiladi(birthDayIR)) : false;
});

CoachSchema.pre("updateOne", async function (next) {
  const { birthDayIR, registerDateIR } = this._update;

  if (birthDayIR) {
    this.birthDayEN = shamsiToMiladi(birthDayIR);
    this.set({ birthDayEN: this.birthDayEN });
  }
  if (registerDateIR) {
    this.registerDateEN = shamsiToMiladi(registerDateIR);
    this.set({ registerDateEN: this.registerDateEN });
  }
  next();
});

const CoachModel = mongoose.model("coach", CoachSchema);

module.exports = {
  CoachModel,
};
