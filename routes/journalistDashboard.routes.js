const express = require('express');
const { 
  getMyArticles, 
  getStats 
} = require('../controllers/journalistDashboard');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('journalist'));

router.get('/articles', getMyArticles);
router.get('/stats', getStats);

module.exports = router;
