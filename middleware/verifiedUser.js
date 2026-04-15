const verifiedUser = (req, res, next) => {
  if (!req.user.isVerified) {
    return res.status(401).json({
      success: false,
      message: 'Please verify your email first'
    });
  }
  next();
};

module.exports = verifiedUser;
