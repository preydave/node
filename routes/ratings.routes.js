const express = require('express');
const { 
  rateArticle, 
  rateJournalist 
} = require('../controllers/ratings.controller');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/article/:articleId', authMiddleware, rateArticle);
router.post('/journalist/:journalistId', authMiddleware, rateJournalist);

module.exports = router;
