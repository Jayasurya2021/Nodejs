const asyncHandler = require('../middleware/asyncHandler');
const Review = require('../models/reviewModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// @desc    Get reviews for a product
// @route   GET /api/reviews/product/:productId
// @access  Public
const getProductReviews = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const skip = (page - 1) * limit;

  // Sorting options
  let sortObj = { createdAt: -1 }; // default: newest
  if (req.query.sort === 'highest') sortObj = { rating: -1 };
  if (req.query.sort === 'lowest') sortObj = { rating: 1 };

  const reviews = await Review.find({ product: req.params.productId })
    .populate('user', 'name')
    .sort(sortObj)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments({ product: req.params.productId });

  res.json({
    reviews,
    total,
    page,
    pages: Math.ceil(total / limit)
  });
});

// @desc    Create new review
// @route   POST /api/reviews
// @access  Private
const createReview = asyncHandler(async (req, res) => {
  const { productId, rating, title, comment, images } = req.body;

  // Check if product exists
  const product = await Product.findById(productId);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  const alreadyReviewed = await Review.findOne({
    product: productId,
    user: req.user._id
  });

  if (alreadyReviewed) {
    res.status(400);
    throw new Error('You have already reviewed this product');
  }

  // Enforce Verified Purchase Rule
  const hasPurchased = await Order.findOne({
    user: req.user._id,
    isPaid: true,
    'orderItems.product': productId
  });

  if (!hasPurchased) {
    res.status(400);
    throw new Error('You can only review products you have purchased.');
  }

  const review = await Review.create({
    product: productId,
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    title,
    comment,
    images: images || [],
    isVerifiedPurchase: true
  });

  res.status(201).json({ message: 'Review added', review });
});

// @desc    Update review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Ensure user owns the review
  if (review.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error('User not authorized to update this review');
  }

  const { rating, title, comment, images } = req.body;

  review.rating = rating || review.rating;
  review.title = title || review.title;
  review.comment = comment || review.comment;
  if (images) review.images = images;

  const updatedReview = await review.save();
  res.json({ message: 'Review updated', review: updatedReview });
});

// @desc    Delete review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);

  if (!review) {
    res.status(404);
    throw new Error('Review not found');
  }

  // Ensure user owns the review or is an admin
  if (review.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
    res.status(401);
    throw new Error('User not authorized to delete this review');
  }

  await Review.findOneAndDelete({ _id: req.params.id });
  res.json({ message: 'Review removed' });
});

module.exports = {
  getProductReviews,
  createReview,
  updateReview,
  deleteReview
};
