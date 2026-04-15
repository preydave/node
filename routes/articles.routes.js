const express = require("express");
const router = express.Router();
const Article = require("../models/article.model");

// ============================================
// 🔹 GET ALL ARTICLES (Flexible)
// ============================================
router.get("/", async (req, res) => {
  try {
    const { status } = req.query;

    let filter = {};

    // 👉 If status passed (admin/journalist use)
    if (status) {
      filter.status = status;
    } else {
      // 👉 Default: only published for readers
      filter = { status: "published", isApproved: true };
    }

    const articles = await Article.find(filter).sort({ createdAt: -1 });

    res.json(articles);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ============================================
// 🔹 CREATE ARTICLE
// ============================================
router.post("/", async (req, res) => {
  try {
    const { title, content, city, state, category } = req.body;

    if (!title || !content || !city || !state || !category) {
      return res.status(400).json({
        message: "All fields are required ❌",
      });
    }

    const article = new Article({
      title,
      content,
      city,
      state,
      category,
      status: "draft",        // default
      isApproved: false,      // default
      views: 0,
      likes: [],
    });

    await article.save();

    res.status(201).json(article);

  } catch (err) {
    console.error("CREATE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ============================================
// 🔹 GET SINGLE ARTICLE
// ============================================
router.get("/:id", async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found ❌" });
    }

    // 👉 increase views
    article.views = (article.views || 0) + 1;
    await article.save();

    res.json(article);

  } catch (err) {
    console.error("GET ONE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ============================================
// 🔥 SUBMIT ARTICLE (Draft → Published)
// ============================================
router.put("/submit/:id", async (req, res) => {
  try {
    const article = await Article.findByIdAndUpdate(
      req.params.id,
      {
        status: "published",
        isApproved: true,
      },
      { new: true }
    );

    if (!article) {
      return res.status(404).json({ message: "Article not found ❌" });
    }

    res.json(article);

  } catch (err) {
    console.error("SUBMIT ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

// ============================================
// 🔥 DELETE ARTICLE
// ============================================
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Article.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Article not found ❌" });
    }

    res.json({
      message: "Article deleted ✅",
      id: req.params.id,
    });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;