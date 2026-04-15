const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      "https://newsapi.org/v2/top-headlines?country=in&apiKey=78733bf551304a95938fe13521a53466"
    );

    res.json(response.data);
  } catch (err) {
    res.status(500).json({ message: "Error fetching news" });
  }
});

module.exports = router;