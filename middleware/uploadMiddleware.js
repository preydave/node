const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const path = require('path');

const storage = multer.memoryStorage();

const uploadMiddleware = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

const uploadImage = async (req, res, next) => {
  if (req.file) {
    try {
      const result = await cloudinary.uploader.upload_stream(
        { folder: 'news-portal' },
        (error, result) => {
          if (result) {
            req.fileLocation = result.secure_url;
            req.filePublicId = result.public_id;
            next();
          } else {
            res.status(500).json({ error: error.message });
          }
        }
      ).end(req.file.buffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  } else {
    next();
  }
};

module.exports = { uploadMiddleware, uploadImage };
