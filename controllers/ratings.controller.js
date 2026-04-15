const Article = require('../models/article.model');
const Journalist = require('../models/journalist.model');

const rateArticle = async (req, res) => {
  try {
    const { rating } = req.body;
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    // Prevent duplicate ratings
    const hasRated = article.ratings.find(r => r.user.toString() === req.user.id);
    if (hasRated) {
      return res.status(400).json({
        success: false,
        message: 'You have already rated this article'
      });
    }

    article.ratings.push({
      user: req.user.id,
      rating
    });

    await article.save();

    res.status(200).json({
      success: true,
      message: 'Rating submitted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const rateJournalist = async (req, res) => {
  try {
    const { rating } = req.body;
    const journalist = await Journalist.findById(req.params.journalistId);

    if (!journalist) {
      return res.status(404).json({
        success: false,
        message: 'Journalist not found'
      });
    }

    // Update rating
    const totalRating = journalist.totalRatings * journalist.rating + rating;
    journalist.rating = totalRating / (journalist.totalRatings + 1);
    journalist.totalRatings += 1;

    await journalist.save();

    res.status(200).json({
      success: true,
      rating: journalist.rating
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  rateArticle,
  rateJournalist
};
