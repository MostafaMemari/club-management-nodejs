const { Schema, Types, model } = require("mongoose");

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["ADMIN_CLUB", "SUPER_ADMIN"], default: "ADMIN_CLUB" },

    clubs: { type: [Types.ObjectId], ref: "club" },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = model("user", UserSchema);

module.exports = { UserModel };
