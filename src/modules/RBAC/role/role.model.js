const mongoose = require("mongoose");

const RoleSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    description: { type: String, default: "" },
    permissions: [{ type: mongoose.Types.ObjectId, ref: "permission", default: [] }],
  },
  { versionKey: false }
);

const RoleModel = mongoose.model("role", RoleSchema);

module.exports = {
  RoleModel,
};
