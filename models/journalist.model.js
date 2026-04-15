const mongoose = require('mongoose');

const journalistSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  bio: {
    type: String,
    maxlength: 500
  },
  city: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  expertise: [{
    type: String
  }],
  totalArticles: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  totalRatings: {
    type: Number,
    default: 0
  },
  isApproved: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Journalist', journalistSchema);
