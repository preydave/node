require("dotenv").config(); // ✅ MUST FIRST

const express = require("express");
const cors = require("cors");

const app = express();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= TEST ROUTE =================
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;