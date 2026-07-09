const express = require('express');
const router = express.Router();
const { getSellerProducts, getSellerAnalytics } = require('../controllers/sellerController');
const { protect, isSeller } = require('../middleware/authMiddleware');

router.route('/products').get(protect, isSeller, getSellerProducts);
router.route('/analytics').get(protect, isSeller, getSellerAnalytics);

module.exports = router;
