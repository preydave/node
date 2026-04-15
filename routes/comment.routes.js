const express = require('express');
const { 
  createComment, 
  replyComment, 
  getComments, 
  deleteComment 
} = require('../controllers/comment.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:articleId', authMiddleware, createComment);
router.post('/reply/:parentId', authMiddleware, replyComment);
router.get('/:articleId', getComments);
router.delete('/:id', authMiddleware, deleteComment);

module.exports = router;
