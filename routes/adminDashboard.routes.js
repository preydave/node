const express = require('express');
const { getUsersStats, getArticlesStats } = require('../controllers/adminDashboard');
const authMiddleware = require('../middleware/authMiddleware');
const roleMiddleware = require('../middleware/roleMiddleware');

const router = express.Router();

router.use(authMiddleware);
router.use(roleMiddleware('admin'));

router.get('/users', getUsersStats);
router.get('/articles', getArticlesStats);

module.exports = router;
