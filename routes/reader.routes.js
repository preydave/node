const express = require("express");
const router = express.Router();

const Article = require("../models/article.model");

// ==============================
// DASHBOARD
// ==============================
router.get("/dashboard", async (req, res) => {
  try {
    const recommended = await Article.find().limit(6);

    res.json({
      success: true,
      data: {
        recommended,
        likedArticles: [],
        savedArticles: [],
        comments: [],
        activitySummary: {
          totalLikes: 0,
          totalComments: 0,
        },
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
});

module.exports = router;