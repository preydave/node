const Article = require('../models/article.model');
const Comment = require('../models/comment.model');

const toggleArticleLike = async (req, res) => {
  try {
    const article = await Article.findById(req.params.articleId);

    if (!article) {
      return res.status(404).json({
        success: false,
        message: 'Article not found'
      });
    }

    const userId = req.user.id.toString();
    const hasLiked = article.likes.includes(userId);

    if (hasLiked) {
      article.likes.pull(userId);
      article.save();
      message = 'Article unliked';
    } else {
      article.likes.push(userId);
      article.save();
      message = 'Article liked';
    }

    res.status(200).json({
      success: true,
      message,
      likes: article.likes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const toggleCommentLike = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.commentId);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    const userId = req.user.id.toString();
    const commentIndex = comment.likes.indexOf(userId);

    if (commentIndex > -1) {
      comment.likes.splice(commentIndex, 1);
      message = 'Comment unliked';
    } else {
      comment.likes.push(userId);
      message = 'Comment liked';
    }

    await comment.save();

    res.status(200).json({
      success: true,
      message,
      likes: comment.likes.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  toggleArticleLike,
  toggleCommentLike
};
