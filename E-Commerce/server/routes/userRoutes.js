const express = require('express');
const router = express.Router();
const {
  syncCart,
  getCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  addAddress,
  updateAddress,
  deleteAddress,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod
} = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

router.route('/cart').get(protect, getCart).post(protect, syncCart);
router.route('/wishlist').get(protect, getWishlist);
router.route('/wishlist/:productId').post(protect, addToWishlist).delete(protect, removeFromWishlist);
router.route('/addresses').post(protect, addAddress);
router.route('/addresses/:id').put(protect, updateAddress).delete(protect, deleteAddress);
router.route('/payment-methods').post(protect, addPaymentMethod);
router.route('/payment-methods/:id').put(protect, updatePaymentMethod).delete(protect, deletePaymentMethod);

module.exports = router;
