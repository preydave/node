const express = require("express");
const router = express.Router();

// Dummy Dashboard Data
router.get("/", async (req, res) => {
  try {
    res.json({
      totalArticles: 10,
      totalViews: 500,
      totalLikes: 120,
      recentArticles: [],
    });
  } catch (error) {
    res.status(500).json({ message: "Dashboard error" });
  }
});

module.exports = router;