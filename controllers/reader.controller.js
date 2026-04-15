const Article = require("../models/article.model");
require("../models/user.model"); // ✅ MUST BE AT TOP

// ✅ GET ALL ARTICLES
const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find()
      .populate("author", "name")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ CITY NEWS
const getCityNews = async (req, res) => {
  try {
    const { city, state, category } = req.query;

    const query = {};
    if (city) query.city = city;
    if (state) query.state = state;
    if (category) query.category = category;

    const articles = await Article.find(query)
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      articles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ✅ TOP NEWS
const getTopNews = async (req, res) => {
  try {
    const topArticles = await Article.find()
      .sort({ views: -1 })
      .limit(10)
      .populate("author", "name");

    res.status(200).json({
      success: true,
      articles: topArticles,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getAllArticles,
  getCityNews,
  getTopNews,
};