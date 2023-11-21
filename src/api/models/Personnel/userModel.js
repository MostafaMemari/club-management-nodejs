const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, enum: ["ADMIN_CLUB", "USER"], default: "USER" },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
};
