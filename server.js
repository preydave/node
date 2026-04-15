require("dotenv").config();

const mongoose = require("mongoose");
const axios = require("axios");
const app = require("./app"); // ✅ import app

// ================= DB CONNECT =================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => {
    console.error("DB Error:", err.message);
    process.exit(1);
  });

// ================= ROUTES =================
const authRoutes = require("./routes/auth.routes");
const articleRoutes = require("./routes/articles.routes");
const adminRoutes = require("./routes/adminRoutes");
const advertiserRoutes = require("./routes/advertiser.routes");
const dashboardRoutes = require("./routes/dashboard.routes");
const aiRoutes = require("./routes/ai.routes");
const readerRoutes = require("./routes/reader.routes"); // ✅ FIX

// ================= USE ROUTES =================
app.use("/api/auth", authRoutes);
app.use("/api/articles", articleRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/advertiser", advertiserRoutes);
app.use("/api/journalist-dashboard", dashboardRoutes);
app.use("/api/ai", aiRoutes);

// 🔥 IMPORTANT (THIS FIXES YOUR ERROR)
app.use("/api/reader", readerRoutes);

// ================= EXTERNAL NEWS API =================
app.get("/api/news", async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=india&sortBy=publishedAt&apiKey=${process.env.NEWS_API_KEY}`
    );

    const filtered = response.data.articles.filter(
      (item) => item.title && item.urlToImage
    );

    res.json({
      success: true,
      totalResults: filtered.length,
      articles: filtered,
    });
  } catch (err) {
    console.error("NEWS API ERROR:", err.message);
    res.status(500).json({
      success: false,
      message: "Error fetching external news",
    });
  }
});

// ================= ROOT =================
app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ================= 404 =================
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found ❌",
  });
});

// ================= ERROR HANDLER =================
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err);

  res.status(500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

// ================= SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🚀`);
});