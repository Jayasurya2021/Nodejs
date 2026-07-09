const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/productModel');
const User = require('../models/userModel');
const Order = require('../models/orderModel');
const AuditLog = require('../models/auditLogModel');

// @desc    Get global analytics
// @route   GET /api/admin/analytics
// @access  Private/Admin
const getGlobalAnalytics = asyncHandler(async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalBuyers = await User.countDocuments({ role: 'buyer' });
  const totalSellers = await User.countDocuments({ role: 'seller' });
  
  const totalProducts = await Product.countDocuments();
  const pendingProducts = await Product.countDocuments({ status: 'pending' });
  const activeProducts = await Product.countDocuments({ status: 'approved' });
  const rejectedProducts = await Product.countDocuments({ status: 'rejected' });

  const orders = await Order.find({});
  const totalRevenue = orders.reduce((acc, item) => acc + item.totalPrice, 0);

  res.json({
    users: { total: totalUsers, buyers: totalBuyers, sellers: totalSellers },
    products: { total: totalProducts, active: activeProducts, pending: pendingProducts, rejected: rejectedProducts },
    orders: { total: orders.length, revenue: totalRevenue }
  });
});

// @desc    Approve or Reject Product
// @route   PUT /api/admin/products/:id/status
// @access  Private/Admin
const updateProductStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  if (!['approved', 'rejected'].includes(status)) {
    res.status(400);
    throw new Error('Invalid status');
  }

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  product.status = status;
  await product.save();

  // Log Audit
  await AuditLog.create({
    user: req.user._id,
    action: status === 'approved' ? 'APPROVED_PRODUCT' : 'REJECTED_PRODUCT',
    targetId: product._id,
    targetModel: 'Product',
    ipAddress: req.ip
  });

  res.json({ message: `Product ${status} successfully`, product });
});

module.exports = {
  getGlobalAnalytics,
  updateProductStatus
};
