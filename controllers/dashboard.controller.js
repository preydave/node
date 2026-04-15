const Article = require("../models/article.model");

// 🔥 JOURNALIST DASHBOARD
const getJournalistDashboard = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });

    res.json({
      stats: {
        total: articles.length,
        published: articles.filter(a => a.status === "published").length,
        pending: articles.filter(a => a.status === "pending").length,
        draft: articles.filter(a => a.status === "draft").length,
      },
      articles
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getJournalistDashboard
};
