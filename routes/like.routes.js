const express = require('express');
const { 
  toggleArticleLike, 
  toggleCommentLike 
} = require('../controllers/like.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/article/:articleId', authMiddleware, toggleArticleLike);
router.post('/comment/:commentId', authMiddleware, toggleCommentLike);

module.exports = router;
