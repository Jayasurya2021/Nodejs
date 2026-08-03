const express = require('express');
const router = express.Router();
const {
  getSessions,
  revokeSession,
  revokeAllOtherSessions
} = require('../controllers/securityController');
const { protect } = require('../middleware/authMiddleware');

router.route('/sessions').get(protect, getSessions);
router.route('/session/:sessionId').delete(protect, revokeSession);
router.route('/logout-all').delete(protect, revokeAllOtherSessions);

module.exports = router;
