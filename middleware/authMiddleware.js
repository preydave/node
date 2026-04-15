const jwt = require("jsonwebtoken");
const User = require("../models/user");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      return next(); // ✅ MUST
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized, no token",
    });

  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Token failed",
    });
  }
};

module.exports = protect; // ❗ IMPORTANT (not object)