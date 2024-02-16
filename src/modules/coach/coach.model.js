const mongoose = require("mongoose");

const { Types, Schema } = mongoose;

const CoachSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    nationalCode: { type: String, required: true, unique: true },

    fatherName: { type: String },
    gender: { type: String, enum: ["مرد", "زن"], default: "مرد" },
    role: { type: String, default: "COACH" },
    mobile: { type: String },
    address: { type: String },
    birthDay: { type: String },
    imageUrl: { type: String, default: "/uploads/profile-coachs.jpg" },

    memberShipValidity: { type: Number },

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

    clubs: { type: [Types.ObjectId], ref: "club" },

    // createdBy: { type: Types.ObjectId },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const CoachModel = mongoose.model("coach", CoachSchema);

module.exports = {
  CoachModel,
};
