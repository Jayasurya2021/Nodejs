const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const addressSchema = new mongoose.Schema({
  fullName: { type: String },
  mobile: { type: String },
  street: { type: String, required: true },
  addressLine2: { type: String },
  landmark: { type: String },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  label: { type: String, enum: ['Home', 'Work', 'Other'], default: 'Other' },
  isDefault: { type: Boolean, default: false }
});

const paymentMethodSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g. visa, mastercard, upi
  last4: { type: String }, // For cards
  expiry: { type: String }, // For cards
  name: { type: String, required: true }, // Name on card or UPI ID
  isDefault: { type: Boolean, default: false }
});

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    minlength: 6,
    select: false, // Do not return password by default
    required: function() {
      return this.authProvider === 'local';
    }
  },
  googleId: {
    type: String,
    sparse: true,
    unique: true
  },
  profileImage: {
    type: String
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local'
  },
  emailVerified: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    enum: ['buyer', 'seller', 'admin', 'pending'],
    default: 'buyer'
  },
  phone: { type: String },
  gender: { type: String, enum: ['male', 'female', 'other', ''] },
  dob: { type: Date },
  language: { type: String, default: 'English' },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  pincode: { type: String },
  addresses: [addressSchema],
  paymentMethods: [paymentMethodSchema],
  cart: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    qty: { type: Number },
    selectedSize: { type: String },
    selectedColorName: { type: String }
  }],
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  recentlyViewed: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
}, {
  timestamps: true
});

// Encrypt password using bcrypt before saving
// Skip if password was not modified, or if the user has no password (Google-only users)
userSchema.pre("save", async function () {
  if (!this.password) return;
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function(enteredPassword) {
  if (!enteredPassword) return false;
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
