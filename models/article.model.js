const mongoose = require("mongoose");

const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    city: {
      type: String,
      required: true,
    },

    state: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      default: "https://source.unsplash.com/400x250/?news",
    },

    views: {
      type: Number,
      default: 0,
    },

    isApproved: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "published",
    },

    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

// 🔥 AUTO SLUG GENERATE
articleSchema.pre("save", function (next) {
  if (!this.slug) {
    this.slug =
      this.title.toLowerCase().replace(/ /g, "-") +
      "-" +
      Date.now();
  }
  next();
});

module.exports = mongoose.model("Article", articleSchema);