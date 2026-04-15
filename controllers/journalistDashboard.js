const Article = require('../models/article.model');
const Journalist = require('../models/journalist.model');

const getMyArticles = async (req, res) => {
  try {
    const articles = await Article.find({ author: req.user.id })
      .sort({ createdAt: -1 })
      .populate('author', 'name');

    res.status(200).json({
      success: true,
      data: articles
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getStats = async (req, res) => {
  try {
    const journalist = await Journalist.findOne({ user: req.user.id });
    
    const stats = {
      totalArticles: journalist.totalArticles,
      totalViews: 0,
      avgRating: journalist.rating
    };

    // Calculate total views from articles
    const articles = await Article.find({ author: req.user.id });
    stats.totalViews = articles.reduce((sum, article) => sum + (article.views || 0), 0);

    res.status(200).json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getMyArticles,
  getStats
};
