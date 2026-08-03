const mongoose = require('mongoose');

const userSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  sessionId: {
    type: String,
    required: true,
    unique: true
  },
  deviceName: { type: String, default: 'Unknown Device' },
  browser: { type: String, default: 'Unknown Browser' },
  os: { type: String, default: 'Unknown OS' },
  userAgent: { type: String },
  ipAddress: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  loginAt: { type: Date, default: Date.now },
  lastActiveAt: { type: Date, default: Date.now, index: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const UserSession = mongoose.model('UserSession', userSessionSchema);
module.exports = UserSession;
