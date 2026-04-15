const express = require('express');
const { updateProfile, deleteProfile } = require('../controllers/profile.controllers');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.use(authMiddleware);

router.route('/').put(updateProfile).delete(deleteProfile);

module.exports = router;
