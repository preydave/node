const express = require("express");
const router = express.Router();

// ================= TEST ROUTE =================
router.get("/test", (req, res) => {
  console.log("🔥 AI TEST ROUTE HIT");
  res.send("AI working locally ✅");
});

// 🔥 DEBUG MIDDLEWARE
router.use((req, res, next) => {
  console.log("🔥 AI ROUTE HIT:", req.method, req.url);
  next();
});

// ================= SUMMARY =================
router.post("/summary", async (req, res) => {
  try {
    const { content } = req.body;

    // 🔥 FAKE AI SUMMARY
    const summary =
      content.split(" ").slice(0, 20).join(" ") + "...";

    res.json({ summary });

  } catch (err) {
    console.log("❌ ERROR (SUMMARY):", err.message);
    res.status(500).json({ message: "AI Error" });
  }
});

// ================= HEADLINE =================
router.post("/headline", async (req, res) => {
  try {
    const { content } = req.body;

    // 🔥 FAKE HEADLINE
    const headline =
      content.split(" ").slice(0, 6).join(" ") + "...";

    res.json({ headline });

  } catch (err) {
    console.log("❌ ERROR (HEADLINE):", err.message);
    res.status(500).json({ message: "AI Error" });
  }
});

// ================= DESCRIPTION =================
router.post("/description", async (req, res) => {
  try {
    const { content } = req.body;

    // 🔥 FAKE DESCRIPTION
    const description =
      content.split(" ").slice(0, 15).join(" ") + "...";

    res.json({ description });

  } catch (err) {
    console.log("❌ ERROR (DESCRIPTION):", err.message);
    res.status(500).json({ message: "AI Error" });
  }
});

module.exports = router;