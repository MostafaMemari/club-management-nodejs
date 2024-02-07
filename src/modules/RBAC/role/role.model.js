const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    title: { type: String, unique: true },
    description: { type: String, default: "" },
    permissions: [{ type: mongoose.Types.ObjectId, ref: "permission", default: [] }],
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const roleModel = mongoose.model("role", roleSchema);

module.exports = {
  roleModel,
};
