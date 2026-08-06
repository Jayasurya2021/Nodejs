const express = require('express');
const router = express.Router();
const { getChatHistory, getAdminChats, getAdminChatHistory, markAsRead } = require('../controllers/chatController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, getChatHistory);
router.route('/read').put(protect, markAsRead);
router.route('/admin').get(protect, admin, getAdminChats);
router.route('/admin/:userId').get(protect, admin, getAdminChatHistory);

module.exports = router;
