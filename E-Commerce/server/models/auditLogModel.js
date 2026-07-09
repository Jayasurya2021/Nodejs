const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Admin who performed the action
    required: true
  },
  action: {
    type: String,
    required: true // e.g., 'APPROVED_PRODUCT', 'DELETED_USER'
  },
  targetId: {
    type: mongoose.Schema.Types.ObjectId // e.g., Product ID, User ID
  },
  targetModel: {
    type: String // e.g., 'Product', 'User'
  },
  details: {
    type: Object // any additional meta info
  },
  ipAddress: {
    type: String
  }
}, {
  timestamps: true
});

const AuditLog = mongoose.model('AuditLog', auditLogSchema);
module.exports = AuditLog;
