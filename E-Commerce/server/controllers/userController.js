const asyncHandler = require('../middleware/asyncHandler');
const User = require('../models/userModel');
const Product = require('../models/productModel');

// @desc    Sync user cart
// @route   POST /api/users/cart
// @access  Private
const syncCart = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const cartItems = req.body.cartItems || [];
    user.cart = cartItems.map(item => ({
      product: item._id,
      qty: item.qty,
      selectedSize: item.selectedSize,
      selectedColorName: item.selectedVariant?.colorName || item.color
    }));
    await user.save();
    res.json({ success: true, message: 'Cart synced successfully' });
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
    const cartItems = user.cart.map(item => {
      if (!item.product) return null;
      
      const product = item.product;
      const variant = product.variants?.find(v => v.colorName === item.selectedColorName);
      
      let price = variant ? variant.price : (product.variants?.[0]?.price || product.price);
      let originalPrice = variant ? variant.originalPrice : (product.variants?.[0]?.originalPrice || product.originalPrice);

      if (variant && item.selectedSize) {
        const sizeObj = variant.sizes?.find(s => s.name === item.selectedSize);
        if (sizeObj) {
          if (sizeObj.price != null && sizeObj.price !== '') price = Number(sizeObj.price);
          if (sizeObj.originalPrice != null && sizeObj.originalPrice !== '') originalPrice = Number(sizeObj.originalPrice);
        }
      }

      return {
        _id: product._id,
        title: product.title,
        price,
        originalPrice,
        images: variant && variant.images?.length > 0 ? variant.images : product.images,
        qty: item.qty,
        selectedSize: item.selectedSize,
        color: item.selectedColorName,
        selectedVariant: variant || { colorName: item.selectedColorName }
      };
    }).filter(Boolean);

    res.json({ success: true, cartItems });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

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

module.exports = {
  syncCart,
  getCart,
  getWishlist,
  addToWishlist,
  removeFromWishlist,
};
