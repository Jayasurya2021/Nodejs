const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: { type: String, required: true },
  rating: { type: Number, required: true },
  comment: { type: String, required: true }
}, {
  timestamps: true
});

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a product name'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description']
  },
  price: {
    type: Number,
    required: [true, 'Please add a price'],
    default: 0
  },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String }
    }
  ],
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  sizes: [{
    type: String,
    enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL', '30', '32', '34', '36', 'One Size']
  }],
  colors: [{
    name: { type: String },
    hex: { type: String }
  }],
  material: {
    type: String
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  },
  discount: {
    type: Number, // Percentage 0-100
    default: 0
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  isLimitedEdition: {
    type: Boolean,
    default: false
  },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
