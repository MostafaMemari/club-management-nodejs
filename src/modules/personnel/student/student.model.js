const mongoose = require("mongoose");
const { shamsiToMiladi } = require("../../../common/utils/dateConvarter");
const { assignAgeGroups } = require("../../../common/utils/assignAgeGroups");

const { Types, Schema } = mongoose;

const StudentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalID: { type: String, unique: true },
    fatherName: { type: String },
    gender: { type: String, enum: ["مرد", "زن"], default: "مرد" },
    role: { type: String, default: "STUDENT" },
    mobile: { type: String },
    address: { type: String },
    phone: { type: String },
    birthDay: { type: String },
    registerDate: { type: String },
    imageUrl: { type: String, default: "/uploads/profile-students.jpg" },
    club: { type: Types.ObjectId, ref: "club" },

    belt: { type: Types.ObjectId, ref: "belt" },
    beltDate: { type: String },
    memberShipValidity: { type: Number },
    sportsInsuranceDate: { type: String },

    coach: { type: Types.ObjectId, ref: "coach" },

    birthDayMiladi: { type: Date },
    registerDateMiladi: { type: Date },
    sportsInsuranceMiladi: { type: Date },
    beltDateMiladi: { type: Date },
    ageGroup: { type: [Types.ObjectId], ref: "ageGroup" },

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
  const { birthDay, registerDate, sportsInsuranceDate, beltDate } = this;
  registerDate && (this.registerDateMiladi = shamsiToMiladi(registerDate));
  sportsInsuranceDate && (this.sportsInsuranceMiladi = shamsiToMiladi(sportsInsuranceDate));
  beltDate && (this.beltDateMiladi = shamsiToMiladi(beltDate));

  if (birthDay) {
    this.birthDayMiladi = shamsiToMiladi(birthDay);
    this.ageGroup = await assignAgeGroups(this.birthDayMiladi);
  }
});

StudentSchema.pre("updateOne", async function (next) {
  const { birthDay, registerDate, sportsInsuranceDate, beltDate } = this._update;

  if (birthDay) {
    this.birthDayMiladi = shamsiToMiladi(birthDay);
    this.set({ birthDayMiladi: this.birthDayMiladi });
    this.set({ ageGroup: await assignAgeGroups(this.birthDayMiladi) });
  }
  if (registerDate) {
    this.registerDateMiladi = shamsiToMiladi(registerDate);
    this.set({ registerDateMiladi: this.registerDateMiladi });
  }
  if (sportsInsuranceDate) {
    this.sportsInsuranceMiladi = shamsiToMiladi(sportsInsuranceDate);
    this.set({ sportsInsuranceMiladi: this.sportsInsuranceMiladi });
  }
  if (beltDate) {
    this.beltDateMiladi = shamsiToMiladi(beltDate);
    this.set({ beltDateMiladi: this.beltDateMiladi });
  }
  next();
});

const StudentModel = mongoose.model("student", StudentSchema);

module.exports = {
  StudentModel,
};
