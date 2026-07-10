const express = require('express');
const router = express.Router();
const { getGlobalAnalytics, updateProductStatus, getAdminProducts } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/analytics').get(protect, admin, getGlobalAnalytics);
router.route('/products').get(protect, admin, getAdminProducts);
router.route('/products/:id/status').put(protect, admin, updateProductStatus);

module.exports = router;
