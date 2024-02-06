const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../../api/helpers/dateConvarter");
const { assignAgeGroups } = require("../../../api/helpers/assignAgeGroups");

const { Types, Schema } = mongoose;

const studentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },

    nationalID: { type: String, unique: true },

    memberShipValidity: { type: Number },

    role: { type: String, default: "STUDENT" },
    gender: { type: String, enum: ["مرد", "زن"], default: "مرد" },
    imageUrl: { type: String, default: "uploads/profile-students.jpg" },

    mobile: { type: String },
    fatherName: { type: String },
    address: { type: String },
    phone: { type: String },

    birthDayIR: { type: String },
    registerDateIR: { type: String },
    sportsInsuranceIR: { type: String },
    beltDateIR: { type: String },

    birthDayEN: { type: Date },
    registerDateEN: { type: Date },
    sportsInsuranceEN: { type: Date },
    beltDateEN: { type: Date },

    clubID: { type: Types.ObjectId, ref: "club" },
    beltID: { type: Types.ObjectId, ref: "belt" },

    ageGroupID: [{ type: Types.ObjectId, ref: "ageGroup" }],

    coachID: { type: Types.ObjectId, ref: "coach" },

    createdBy: { type: Schema.Types.ObjectId, required: true, refPath: "modelCreatedBy" },

    modelCreatedBy: {
      type: String,
      required: true,
      enum: ["user", "coach"],
    },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

studentSchema.pre("save", async function () {
  const { birthDayIR, registerDateIR, sportsInsuranceIR, beltDateIR } = this;
  registerDateIR ? (this.registerDateEN = shamsiToMiladi(registerDateIR)) : false;
  sportsInsuranceIR ? (this.sportsInsuranceEN = shamsiToMiladi(sportsInsuranceIR)) : false;
  beltDateIR ? (this.beltDateEN = shamsiToMiladi(beltDateIR)) : false;

  if (birthDayIR) {
    this.birthDayEN = shamsiToMiladi(birthDayIR);
    this.ageGroupID = await assignAgeGroups(this.birthDayEN);
  }
});

studentSchema.pre("updateOne", async function (next) {
  const { birthDayIR, registerDateIR, sportsInsuranceIR, beltDateIR } = this._update;

  if (birthDayIR) {
    this.birthDayEN = shamsiToMiladi(birthDayIR);
    this.set({ birthDayEN: this.birthDayEN });
    this.set({ ageGroupID: await assignAgeGroups(this.birthDayEN) });
  }
  if (registerDateIR) {
    this.registerDateEN = shamsiToMiladi(registerDateIR);
    this.set({ registerDateEN: this.registerDateEN });
  }
  if (sportsInsuranceIR) {
    this.sportsInsuranceEN = shamsiToMiladi(sportsInsuranceIR);
    this.set({ sportsInsuranceEN: this.sportsInsuranceEN });
  }
  if (beltDateIR) {
    this.beltDateEN = shamsiToMiladi(beltDateIR);
    this.set({ beltDateEN: this.beltDateEN });
  }
  next();
});

const studentModel = mongoose.model("student", studentSchema);

module.exports = {
  studentModel,
};
