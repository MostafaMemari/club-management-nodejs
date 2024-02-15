const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role: { type: String, enum: ["ADMIN_CLUB", "SUPER_ADMIN"], default: "ADMIN_CLUB" },
  },
  { timestamps: true, versionKey: false }
);

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
