const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    category: String,
    image: String,
    video: String,
    location: String,
    reporterName: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);