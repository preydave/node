const mongoose = require('mongoose');

const advertiserSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  businessType: {
    type: String,
    required: true
  },
  city: String,
  state: String,
  campaigns: [{
    name: String,
    budget: Number,
    duration: Number,
    status: {
      type: String,
      enum: ['active', 'paused', 'completed'],
      default: 'active'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  totalSpend: {
    type: Number,
    default: 0
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Advertiser', advertiserSchema);
