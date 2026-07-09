const mongoose = require('mongoose');

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  action: {
    type: String,
    required: true // e.g., 'LOGGED_IN', 'UPDATED_PROFILE', 'VIEWED_PRODUCT'
  },
  details: {
    type: Object // additional info like productId viewed
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

const ActivityLog = mongoose.model('ActivityLog', activityLogSchema);
module.exports = ActivityLog;
