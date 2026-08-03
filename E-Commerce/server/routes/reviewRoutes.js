const express = require('express');
const router = express.Router();
const {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview,
  getMyReviews,
  getPendingReviews
} = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(protect, createReview);

router.route('/mine')
  .get(protect, getMyReviews);

router.route('/pending')
  .get(protect, getPendingReviews);

router.route('/:id')
  .put(protect, updateReview)
  .delete(protect, deleteReview);

router.route('/product/:productId')
  .get(getProductReviews);

module.exports = router;
