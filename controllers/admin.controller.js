const User = require("../models/user");
const Article = require("../models/article.model");

// ================= DASHBOARD =================
exports.getDashboardStats = async (req, res) => {
  console.log("📊 DASHBOARD STATS REQUESTED");
  try {
    console.log("👉 Counting users...");
    const totalUsers = await User.countDocuments();
    console.log("✅ Counted:", totalUsers);

    res.json({
      users: {
        totalUsers,
        readers: 5,
        journalists: 2,
        advertisers: 1,
        activeUsers: 8,
        blockedUsers: 0,
      },
      articles: {
        totalArticles: 10,
        publishedArticles: 6,
        pendingArticles: 4,
      },
      campaigns: {
        totalCampaigns: 5,
        activeCampaigns: 3,
        completedCampaigns: 1,
        pausedCampaigns: 1,
      },
      revenue: {
        totalRevenue: 50000,
        totalClicks: 1200,
      },
    });
  } catch (err) {
    console.error("❌ DASHBOARD ERROR:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// ================= ARTICLES =================

// 🔹 GET ALL ARTICLES
exports.getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().sort({ createdAt: -1 });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 GET PENDING ARTICLES
exports.getPendingArticles = async (req, res) => {
  try {
    const articles = await Article.find({ status: "pending" });
    res.json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= ACTIONS =================

// 🔹 APPROVE JOURNALIST (dummy for now)
exports.approveJournalist = async (req, res) => {
  try {
    res.json({ message: "Journalist Approved ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔹 VERIFY ADVERTISER (dummy for now)
exports.verifyAdvertiser = async (req, res) => {
  try {
    res.json({ message: "Advertiser Verified ✅" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ================= CHART DATA =================

// 🔹 MONTHLY REVENUE
exports.getMonthlyRevenue = async (req, res) => {
  res.json([
    { month: "Jan", revenue: 5000 },
    { month: "Feb", revenue: 7000 },
    { month: "Mar", revenue: 9000 },
    { month: "Apr", revenue: 12000 },
  ]);
};

// 🔹 TOP CAMPAIGNS
exports.getTopCampaigns = async (req, res) => {
  res.json([
    { title: "Campaign A", clicks: 120 },
    { title: "Campaign B", clicks: 200 },
    { title: "Campaign C", clicks: 80 },
  ]);
};

// 🔹 LOCATION ANALYTICS
exports.getLocationAnalytics = async (req, res) => {
  res.json([
    { city: "Ahmedabad", users: 60 },
    { city: "Mumbai", users: 80 },
    { city: "Delhi", users: 100 },
  ]);
};