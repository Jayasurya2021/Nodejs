const express = require('express');
const router = express.Router();
const {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getCart,
  syncCart
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/wishlist').get(protect, getWishlist);
router.route('/wishlist/:productId').post(protect, addToWishlist).delete(protect, removeFromWishlist);

router.route('/cart').get(protect, getCart).post(protect, syncCart);

module.exports = router;
