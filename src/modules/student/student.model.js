const mongoose = require("mongoose");

const { Types, Schema } = mongoose;

const StudentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ["مرد", "زن"], required: true },

    nationalCode: { type: String, unique: true },
    birthDay: { type: String },
    fatherName: { type: String },

    registerDate: { type: String },
    role: { type: String, default: "STUDENT" },
    mobile: { type: String },
    address: { type: String },
    phone: { type: String },
    imageUrl: { type: String, default: "/uploads/profile-students.jpg" },

    memberShipValidity: { type: Number },
    sportsInsuranceDate: { type: String },

    beltDate: {
      type: String,
      validate: {
        validator: function (value) {
          return this.belt !== undefined;
        },
      },
    },

    belt: {
      type: Types.ObjectId,
      ref: "belt",
      validate: {
        validator: function (value) {
          return this.beltDate !== undefined;
        },
      },
    },

    club: { type: Types.ObjectId, ref: "club", required: true },
    coach: { type: Types.ObjectId, ref: "coach", required: true },

    createdBy: { type: Types.ObjectId, required: true, refPath: "modelCreatedBy" },
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

const StudentModel = mongoose.model("student", StudentSchema);

module.exports = {
  StudentModel,
};
