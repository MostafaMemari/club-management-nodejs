const mongoose = require("mongoose");

const { Types, Schema } = mongoose;

const CoachSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ["مرد", "زن"], required: true },

    nationalCode: { type: String, unique: true },
    fatherName: { type: String },
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
    createdBy: { type: Schema.Types.ObjectId, required: true, ref: "user" },
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
