const mongoose = require("mongoose");

const permissionSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true },
    description: { type: String, default: "" },
  },
  {
    versionKey: false,
    toJSON: { virtuals: true },
  }
);

const permissionModel = mongoose.model("permission", permissionSchema);

module.exports = {
  permissionModel,
};
