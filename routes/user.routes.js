const express = require('express');
const { 
  registerUser, 
  loginUser, 
  uploadAvatar, 
  getMe, 
  forgotPassword 
} = require('../controllers/user.controller');
const { uploadMiddleware, uploadImage } = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgotpassword', forgotPassword);

router.use(authMiddleware);
router.route('/me').get(getMe);
router.post('/avatar', uploadMiddleware.single('avatar'), uploadImage, uploadAvatar);

module.exports = router;
