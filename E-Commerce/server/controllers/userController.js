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

// @desc    Add a new address to user profile
// @route   POST /api/users/addresses
// @access  Private
const addAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const newAddress = {
      fullName: req.body.fullName,
      mobile: req.body.mobile,
      street: req.body.street,
      addressLine2: req.body.addressLine2,
      landmark: req.body.landmark,
      city: req.body.city,
      state: req.body.state,
      postalCode: req.body.postalCode,
      country: req.body.country,
      label: req.body.label || 'Other',
      isDefault: req.body.isDefault || false
    };
    user.addresses.push(newAddress);
    await user.save();
    res.status(201).json({ success: true, message: 'Address saved successfully', addresses: user.addresses });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update an existing address in user profile
// @route   PUT /api/users/addresses/:id
// @access  Private
const updateAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const addressId = req.params.id;
    const addressIndex = user.addresses.findIndex(addr => addr._id.toString() === addressId);
    
    if (addressIndex !== -1) {
      user.addresses[addressIndex] = {
        _id: user.addresses[addressIndex]._id, // preserve id
        fullName: req.body.fullName || user.addresses[addressIndex].fullName,
        mobile: req.body.mobile || user.addresses[addressIndex].mobile,
        street: req.body.street || user.addresses[addressIndex].street,
        addressLine2: req.body.addressLine2 !== undefined ? req.body.addressLine2 : user.addresses[addressIndex].addressLine2,
        landmark: req.body.landmark !== undefined ? req.body.landmark : user.addresses[addressIndex].landmark,
        city: req.body.city || user.addresses[addressIndex].city,
        state: req.body.state || user.addresses[addressIndex].state,
        postalCode: req.body.postalCode || user.addresses[addressIndex].postalCode,
        country: req.body.country || user.addresses[addressIndex].country,
        label: req.body.label || user.addresses[addressIndex].label,
        isDefault: req.body.isDefault !== undefined ? req.body.isDefault : user.addresses[addressIndex].isDefault
      };
      await user.save();
      res.json({ success: true, message: 'Address updated successfully', addresses: user.addresses });
    } else {
      res.status(404);
      throw new Error('Address not found');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete an existing address in user profile
// @route   DELETE /api/users/addresses/:id
// @access  Private
const deleteAddress = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const addressId = req.params.id;
    const initialLength = user.addresses.length;
    user.addresses = user.addresses.filter(addr => addr._id.toString() !== addressId);
    
    if (user.addresses.length < initialLength) {
      await user.save();
      res.json({ success: true, message: 'Address deleted successfully', addresses: user.addresses });
    } else {
      res.status(404);
      throw new Error('Address not found');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Add a new payment method to user profile
// @route   POST /api/users/payment-methods
// @access  Private
const addPaymentMethod = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const { type, last4, expiry, name, isDefault } = req.body;
    
    // If this is set as default, remove default from others
    if (isDefault) {
      user.paymentMethods.forEach(pm => {
        pm.isDefault = false;
      });
    }

    const newPaymentMethod = {
      type,
      last4,
      expiry,
      name,
      isDefault: isDefault || (user.paymentMethods.length === 0) // First one is default automatically
    };
    
    user.paymentMethods.push(newPaymentMethod);
    await user.save();
    res.status(201).json({ success: true, message: 'Payment method saved successfully', paymentMethods: user.paymentMethods });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Delete an existing payment method in user profile
// @route   DELETE /api/users/payment-methods/:id
// @access  Private
const deletePaymentMethod = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const paymentMethodId = req.params.id;
    const initialLength = user.paymentMethods.length;
    user.paymentMethods = user.paymentMethods.filter(pm => pm._id.toString() !== paymentMethodId);
    
    if (user.paymentMethods.length < initialLength) {
      // If we deleted the default one, make the first remaining one default
      const hasDefault = user.paymentMethods.some(pm => pm.isDefault);
      if (!hasDefault && user.paymentMethods.length > 0) {
        user.paymentMethods[0].isDefault = true;
      }

      await user.save();
      res.json({ success: true, message: 'Payment method deleted successfully', paymentMethods: user.paymentMethods });
    } else {
      res.status(404);
      throw new Error('Payment method not found');
    }
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Update an existing payment method in user profile
// @route   PUT /api/users/payment-methods/:id
// @access  Private
const updatePaymentMethod = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    const paymentMethodId = req.params.id;
    const pmIndex = user.paymentMethods.findIndex(pm => pm._id.toString() === paymentMethodId);
    
    if (pmIndex !== -1) {
      const { type, last4, expiry, name, isDefault } = req.body;
      
      // If this is set as default, remove default from others
      if (isDefault) {
        user.paymentMethods.forEach(pm => {
          pm.isDefault = false;
        });
      }

      user.paymentMethods[pmIndex] = {
        _id: user.paymentMethods[pmIndex]._id, // preserve id
        type: type || user.paymentMethods[pmIndex].type,
        last4: last4 || user.paymentMethods[pmIndex].last4,
        expiry: expiry || user.paymentMethods[pmIndex].expiry,
        name: name || user.paymentMethods[pmIndex].name,
        isDefault: isDefault !== undefined ? isDefault : user.paymentMethods[pmIndex].isDefault
      };
      
      await user.save();
      res.json({ success: true, message: 'Payment method updated successfully', paymentMethods: user.paymentMethods });
    } else {
      res.status(404);
      throw new Error('Payment method not found');
    }
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
  addAddress,
  updateAddress,
  deleteAddress,
  addPaymentMethod,
  updatePaymentMethod,
  deletePaymentMethod,
};
