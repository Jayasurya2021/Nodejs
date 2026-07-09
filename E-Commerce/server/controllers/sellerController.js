const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');

// @desc    Get seller's products
// @route   GET /api/seller/products
// @access  Private/Seller
const getSellerProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ seller: req.user._id }).sort({ createdAt: -1 });
  res.json(products);
});

// @desc    Get seller's dashboard analytics
// @route   GET /api/seller/analytics
// @access  Private/Seller
const getSellerAnalytics = asyncHandler(async (req, res) => {
  // Find all orders that contain products belonging to this seller
  const products = await Product.find({ seller: req.user._id }).select('_id');
  const productIds = products.map(p => p._id);

  const orders = await Order.find({
    'orderItems.product': { $in: productIds }
  });

  // Calculate revenue from this seller's products only
  let totalRevenue = 0;
  let totalSales = 0;

  orders.forEach(order => {
    order.orderItems.forEach(item => {
      if (productIds.some(id => id.toString() === item.product.toString())) {
        totalRevenue += (item.price * item.qty);
        totalSales += item.qty;
      }
    });
  });

  res.json({
    totalProducts: products.length,
    totalOrders: orders.length,
    totalRevenue,
    totalSales
  });
});

module.exports = {
  getSellerProducts,
  getSellerAnalytics
};
