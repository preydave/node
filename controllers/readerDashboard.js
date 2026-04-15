const User = require("../models/user.model");
const Article = require("../models/article.model");

// ================= GET READING HISTORY =================
const getReadingHistory = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId).select("readingHistory");

    const historyIds = user?.readingHistory || [];

    const history = await Article.find({
      _id: { $in: historyIds },
    })
      .populate("author", "name")
      .sort({ createdAt: -1 })
      .limit(20);

    res.status(200).json({
      success: true,
      count: history.length,
      data: history,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= GET PREFERENCES =================
const getPreferences = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const user = await User.findById(userId).select("preferences");

    res.status(200).json({
      success: true,
      data: user?.preferences || {
        preferredCities: [],
        preferredCategories: [],
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ================= UPDATE PREFERENCES =================
const updatePreferences = async (req, res) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const { preferredCities = [], preferredCategories = [] } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        preferences: {
          preferredCities,
          preferredCategories,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Preferences updated successfully ✅",
      data: updatedUser.preferences,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getReadingHistory,
  getPreferences,
  updatePreferences,
};