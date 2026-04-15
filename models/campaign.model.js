const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  title: String,
  status: String,
  clicks: Number,
});

module.exports = mongoose.model("Campaign", campaignSchema);