const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../../common/utils/dateConvarter");
const { assignAgeGroups } = require("../../../common/utils/assignAgeGroups");

const { Types, Schema } = mongoose;

const StudentSchema = new Schema(
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

    birthDayShamsi: { type: String },
    registerDateShamsi: { type: String },
    sportsInsuranceDateShamsi: { type: String },
    beltDateShamsi: { type: String },

    birthDayEN: { type: Date },
    registerDateEN: { type: Date },
    sportsInsuranceEN: { type: Date },
    beltDateEN: { type: Date },

    club: { type: Types.ObjectId, ref: "club" },
    belt: { type: Types.ObjectId, ref: "belt" },

    ageGroup: [{ type: Types.ObjectId, ref: "ageGroup" }],

    coach: { type: Types.ObjectId, ref: "coach" },

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
  const { birthDayShamsi, registerDateShamsi, sportsInsuranceDateShamsi, beltDateShamsi } = this;
  registerDateShamsi ? (this.registerDateEN = shamsiToMiladi(registerDateShamsi)) : false;
  sportsInsuranceDateShamsi ? (this.sportsInsuranceEN = shamsiToMiladi(sportsInsuranceDateShamsi)) : false;
  beltDateShamsi ? (this.beltDateEN = shamsiToMiladi(beltDateShamsi)) : false;

  if (birthDayShamsi) {
    this.birthDayEN = shamsiToMiladi(birthDayShamsi);
    this.ageGroupID = await assignAgeGroups(this.birthDayEN);
  }
});

studentSchema.pre("updateOne", async function (next) {
  const { birthDayShamsi, registerDateShamsi, sportsInsuranceDateShamsi, beltDateShamsi } = this._update;

  if (birthDayShamsi) {
    this.birthDayEN = shamsiToMiladi(birthDayShamsi);
    this.set({ birthDayEN: this.birthDayEN });
    this.set({ ageGroupID: await assignAgeGroups(this.birthDayEN) });
  }
  if (registerDateShamsi) {
    this.registerDateEN = shamsiToMiladi(registerDateShamsi);
    this.set({ registerDateEN: this.registerDateEN });
  }
  if (sportsInsuranceDateShamsi) {
    this.sportsInsuranceEN = shamsiToMiladi(sportsInsuranceDateShamsi);
    this.set({ sportsInsuranceEN: this.sportsInsuranceEN });
  }
  if (beltDateShamsi) {
    this.beltDateEN = shamsiToMiladi(beltDateShamsi);
    this.set({ beltDateEN: this.beltDateEN });
  }
  next();
});

const StudentModel = mongoose.model("student", StudentSchema);

module.exports = {
  StudentModel,
};
