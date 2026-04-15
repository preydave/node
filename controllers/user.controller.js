const User = require('../models/user.model');
const generateToken = require('../utils/generateTokens');
const { uploadMiddleware, uploadImage } = require('../middleware/uploadMiddleware');
const cloudinary = require('../config/cloudinary');

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, city, state } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({
        success: false,
        message: 'User already exists'
      });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      city,
      state
    });

    sendTokenResponse(user, 201, res);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (user && (await user.matchPassword(password))) {
      sendTokenResponse(user, 200, res);
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'news-portal/avatars'
    });

    req.user.avatar = {
      public_id: result.public_id,
      url: result.secure_url
    };

    await req.user.save();

    res.status(200).json({
      success: true,
      data: req.user.avatar
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: req.user
  });
};

const forgotPassword = async (req, res) => {
  // Implement forgot password logic
  res.status(200).json({
    success: true,
    message: 'Email sent'
  });
};

const sendTokenResponse = (user, statusCode, res) => {
  const token = generateToken(user._id);

  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    }
  });
};

module.exports = {
  registerUser,
  loginUser,
  uploadAvatar,
  getMe,
  forgotPassword
};
