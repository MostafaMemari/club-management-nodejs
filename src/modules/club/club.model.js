const { Types, Schema, model } = require("mongoose");

const ClubSchema = new Schema(
  {
    name: { type: String, required: true },
    genders: {
      type: Array,
      required: true,
      validate: {
        validator: function (v) {
          return v.every((value) => ["آقایان", "بانوان"].includes(value));
        },
      },
    },
    sports: { type: [Types.ObjectId], ref: "sport", required: true },

    address: { type: String },
    phone: { type: String },

    coachs: { type: [Types.ObjectId], ref: "coach", required: true },

    createdBy: { type: Types.ObjectId, required: true, refPath: "modelCreatedBy" },
    modelCreatedBy: {
      type: String,
      required: true,
      enum: ["user", "coach"],
    },
  },
  { versionKey: false }
);

const ClubModel = model("club", ClubSchema);

module.exports = {
  ClubModel,
};
