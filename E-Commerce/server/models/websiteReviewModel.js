const mongoose = require('mongoose');

const websiteReviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    required: true
  },
  isApproved: {
    type: Boolean,
    default: false // Admin must approve before it shows on testimonials
  }
}, {
  timestamps: true
});

const WebsiteReview = mongoose.model('WebsiteReview', websiteReviewSchema);
module.exports = WebsiteReview;
