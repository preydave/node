const Comment = require('../models/comment.model');
const Article = require('../models/article.model');

const createComment = async (req, res) => {
  try {
    const { text, parentComment, article } = req.body;

    const comment = await Comment.create({
      text,
      user: req.user.id,
      parentComment,
      article
    });

    // Add comment to article
    await Article.findByIdAndUpdate(article, {
      $push: { comments: comment._id }
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('user', 'name avatar')
      .populate('parentComment', 'text user');

    res.status(201).json({
      success: true,
      data: populatedComment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const replyComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      user: req.user.id
    });

    await Comment.findByIdAndUpdate(req.body.parentComment, {
      $push: { replies: comment._id }
    });

    res.status(201).json({
      success: true,
      data: comment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ article: req.params.articleId })
      .populate('user', 'name avatar')
      .populate('parentComment', 'text')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: comments
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        message: 'Comment not found'
      });
    }

    if (comment.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }

    await comment.remove();

    // Remove comment from article
    await Article.findByIdAndUpdate(comment.article, {
      $pull: { comments: req.params.id }
    });

    res.status(200).json({
      success: true,
      message: 'Comment deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createComment,
  replyComment,
  getComments,
  deleteComment
};
