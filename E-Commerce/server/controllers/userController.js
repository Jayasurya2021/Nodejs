const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// @desc    Get user wishlist
// @route   GET /api/users/wishlist
// @access  Private
const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');

  if (user) {
    res.json({ success: true, wishlist: user.wishlist });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add product to wishlist
// @route   POST /api/users/wishlist/:productId
// @access  Private
const addToWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;

  if (user) {
    const alreadyAdded = user.wishlist.find((id) => id.toString() === productId);

    if (alreadyAdded) {
      res.status(400);
      throw new Error('Product already in wishlist');
    }

    user.wishlist.push(productId);
    await user.save();
    res.status(201).json({ success: true, message: 'Product added to wishlist' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Remove product from wishlist
// @route   DELETE /api/users/wishlist/:productId
// @access  Private
const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;

  if (user) {
    user.wishlist = user.wishlist.filter(
      (id) => id.toString() !== productId
    );
    await user.save();
    res.json({ success: true, message: 'Product removed from wishlist' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Sync user cart
// @route   POST /api/users/cart
// @access  Private
const syncCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const cartItems = req.body.cartItems || [];

  if (user) {
    user.cart = cartItems.map(item => ({
      product: item._id,
      qty: item.qty,
      selectedSize: item.selectedSize || '',
      selectedColorName: item.selectedVariant?.colorName || item.selectedColorName || ''
    }));
    await user.save();
    res.json({ success: true, message: 'Cart synced' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user cart
// @route   GET /api/users/cart
// @access  Private
const getCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate('cart.product');

  if (user) {
    const formattedCart = user.cart
      .filter(item => item.product) // Filter out deleted products
      .map(item => {
        const product = item.product;
        let selectedVariant = null;
        if (item.selectedColorName && product.variants) {
          selectedVariant = product.variants.find(v => v.colorName === item.selectedColorName);
        }
        
        return {
          _id: product._id.toString(),
          title: product.title,
          brand: product.brand,
          price: selectedVariant ? selectedVariant.price : product.price,
          stock: selectedVariant ? selectedVariant.stock : product.stock,
          images: product.images,
          thumbnail: product.thumbnail,
          selectedSize: item.selectedSize,
          selectedVariant: selectedVariant,
          qty: item.qty
        };
    });

    res.json({ success: true, cartItems: formattedCart });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  getCart,
  syncCart
};
