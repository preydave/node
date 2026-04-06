const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    content: String,

    state: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "State",
    },

    city: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "City",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("News", newsSchema);