const { Schema, model } = require("mongoose");

const tournamentSchema = new Schema();

const tournamentModel = model("tournament", tournamentSchema);

module.exports = { tournamentModel };
