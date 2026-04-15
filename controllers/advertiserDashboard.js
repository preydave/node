const Advertiser = require('../models/advertiser.model');

const getCampaignPerformance = async (req, res) => {
  try {
    const advertiser = await Advertiser.findOne({ user: req.user.id });

    const performance = advertiser.campaigns.map(campaign => ({
      name: campaign.name,
      impressions: campaign.impressions || 0,
      clicks: campaign.clicks || 0,
      budgetSpent: campaign.budget * (campaign.duration / 30),
      ctr: campaign.clicks / campaign.impressions * 100 || 0
    }));

    res.status(200).json({
      success: true,
      data: performance
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

const getRevenueStats = async (req, res) => {
  try {
    const advertiser = await Advertiser.findOne({ user: req.user.id });

    const totalRevenue = advertiser.campaigns.reduce((total, campaign) => {
      return total + (campaign.budget || 0);
    }, 0);

    res.status(200).json({
      success: true,
      data: { totalRevenue }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getCampaignPerformance,
  getRevenueStats
};
