const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({
  name: { type: String },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  location: String
}, { timestamps: true });

module.exports = mongoose.model("Store", storeSchema);
