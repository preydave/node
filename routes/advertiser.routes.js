const express = require("express");
const router = express.Router();

// ✅ PUBLIC ADS ROUTE
router.get("/active-ads", (req, res) => {
  res.json({
    success: true,
    ads: [
      {
        _id: "1",
        title: "Ad Banner",
        description: "Sample Ad",
        image: "https://source.unsplash.com/600x200/?advertisement"
      },
      {
        _id: "2",
        title: "Tech Offer",
        description: "Buy gadgets",
        image: "https://source.unsplash.com/600x200/?technology"
      }
    ]
  });
});

module.exports = router;