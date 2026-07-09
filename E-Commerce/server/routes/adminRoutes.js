const express = require('express');
const router = express.Router();
const { getGlobalAnalytics, updateProductStatus } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/analytics').get(protect, admin, getGlobalAnalytics);
router.route('/products/:id/status').put(protect, admin, updateProductStatus);

module.exports = router;
