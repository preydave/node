const express = require('express');
const { 
  getCampaignPerformance, 
  getRevenueStats 
} = require('../controllers/advertiserDashboard');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('advertiser'));

router.get('/performance', getCampaignPerformance);
router.get('/revenue', getRevenueStats);

module.exports = router;
