const News = require("../models/News");

// Create News
exports.createNews = async (req, res) => {
  try {
    const news = await News.create(req.body);
    res.status(201).json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All News
exports.getAllNews = async (req, res) => {
  try {
    const news = await News.find().populate("state city");
    res.json(news);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};