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

const StudentModel = mongoose.model("student", StudentSchema);

module.exports = {
  StudentModel,
};
