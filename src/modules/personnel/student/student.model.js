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

    birthDayMiladi: { type: Date },
    registerDateMiladi: { type: Date },
    sportsInsuranceMiladi: { type: Date },
    beltDateMiladi: { type: Date },

    club: { type: Types.ObjectId, ref: "club" },
    belt: { type: Types.ObjectId, ref: "belt" },

    ageGroup: { type: [Types.ObjectId], ref: "ageGroup" },

    coach: { type: Types.ObjectId, ref: "coach" },

    // createdBy: { type: Schema.Types.ObjectId, required: false, refPath: "modelCreatedBy" },

    // modelCreatedBy: {
    //   type: String,
    //   required: true,
    //   enum: ["user", "coach"],
    // },
  },

  {
    versionKey: false,
    timestamps: true,
  }
);

StudentSchema.pre("save", async function () {
  const { birthDayShamsi, registerDateShamsi, sportsInsuranceDateShamsi, beltDateShamsi } = this;
  registerDateShamsi && (this.registerDateMiladi = shamsiToMiladi(registerDateShamsi));
  sportsInsuranceDateShamsi && (this.sportsInsuranceMiladi = shamsiToMiladi(sportsInsuranceDateShamsi));
  beltDateShamsi && (this.beltDateMiladi = shamsiToMiladi(beltDateShamsi));

  if (birthDayShamsi) {
    this.birthDayMiladi = shamsiToMiladi(birthDayShamsi);
    this.ageGroup = await assignAgeGroups(this.birthDayMiladi);
  }
});

StudentSchema.pre("updateOne", async function (next) {
  const { birthDayShamsi, registerDateShamsi, sportsInsuranceDateShamsi, beltDateShamsi } = this._update;

  if (birthDayShamsi) {
    this.birthDayMiladi = shamsiToMiladi(birthDayShamsi);
    this.set({ birthDayMiladi: this.birthDayMiladi });
    this.set({ ageGroup: await assignAgeGroups(this.birthDayMiladi) });
  }
  if (registerDateShamsi) {
    this.registerDateMiladi = shamsiToMiladi(registerDateShamsi);
    this.set({ registerDateMiladi: this.registerDateMiladi });
  }
  if (sportsInsuranceDateShamsi) {
    this.sportsInsuranceMiladi = shamsiToMiladi(sportsInsuranceDateShamsi);
    this.set({ sportsInsuranceMiladi: this.sportsInsuranceMiladi });
  }
  if (beltDateShamsi) {
    this.beltDateMiladi = shamsiToMiladi(beltDateShamsi);
    this.set({ beltDateMiladi: this.beltDateMiladi });
  }
  next();
});

const StudentModel = mongoose.model("student", StudentSchema);

module.exports = {
  StudentModel,
};
