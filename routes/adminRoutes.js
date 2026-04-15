const express = require("express");
const router = express.Router();

const {
  getDashboardStats,
  approveJournalist,
  verifyAdvertiser,
  getAllArticles,
  getPendingArticles,
  getMonthlyRevenue,
  getTopCampaigns,
  getLocationAnalytics,
} = require("../controllers/admin.controller");

const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

// ================= DASHBOARD =================
router.get("/dashboard", protect, adminOnly, getDashboardStats);

// ================= ARTICLES =================
router.get("/articles", protect, adminOnly, getAllArticles);
router.get("/pendingArticles", protect, adminOnly, getPendingArticles);

// ================= ANALYTICS =================
router.get("/revenue", protect, adminOnly, getMonthlyRevenue);
router.get("/top-campaigns", protect, adminOnly, getTopCampaigns);
router.get("/location-analytics", protect, adminOnly, getLocationAnalytics);

// ================= ACTIONS =================
router.put(
  "/journalist/:id/approve",
  protect,
  adminOnly,
  approveJournalist
);

router.put(
  "/advertiser/:id/verify",
  protect,
  adminOnly,
  verifyAdvertiser
);

module.exports = router;