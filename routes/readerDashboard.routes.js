const express = require('express');
const { 
  getReadingHistory, 
  getPreferences, 
  updatePreferences 
} = require('../controllers/readerDashboard');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('reader'));

router.get('/history', getReadingHistory);
router.route('/preferences').get(getPreferences).put(updatePreferences);

module.exports = router;
