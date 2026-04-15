const express = require("express");
const router = express.Router();

// ✅ simple working route
router.get("/active-ads", (req, res) => {
  res.json({
    ads: [
      {
        _id: "1",
        title: "Ad Banner 1",
        description: "This is a sample ad"
      }
    ]
  });
});

module.exports = router;