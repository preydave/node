const Advertiser = require('../models/advertiser.model');

// ✅ CREATE CAMPAIGN
const createCampaign = async (req, res) => {
  try {
    const campaign = {
      ...req.body,
      user: req.user.id
    };

    const advertiserCampaign = await Advertiser.findOneAndUpdate(
      { user: req.user.id },
      { $push: { campaigns: campaign } },
      { new: true, upsert: true }
    );

    res.status(201).json({
      success: true,
      data: advertiserCampaign.campaigns[
        advertiserCampaign.campaigns.length - 1
      ]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// ✅ GET ALL CAMPAIGNS
const getCampaigns = async (req, res) => {
  try {
    const advertiser = await Advertiser.findOne({ user: req.user.id })
      .populate('user', 'name email');

    res.status(200).json({
      success: true,
      data: advertiser?.campaigns || []
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  createCampaign,
  getCampaigns
};