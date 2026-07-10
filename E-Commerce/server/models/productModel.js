const mongoose = require('mongoose');

const sizeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  stock: { type: Number, default: 0, required: true }
});

const fabricSchema = new mongoose.Schema({
  material: { type: String },
  gsm: { type: String },
  fit: { type: String },
  fabricType: { type: String },
  pattern: { type: String },
  sleeveType: { type: String },
  additionalInfo: { type: String }
});

const variantSchema = new mongoose.Schema({
  color: { type: String },
  colorCode: { type: String },
  sizes: [sizeSchema],
  fabricQuality: fabricSchema,
  sku: { type: String },
  additionalPrice: { type: Number, default: 0 },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String }
    }
  ]
});

const specificationSchema = new mongoose.Schema({
  key: { type: String, required: true },
  value: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a product title'],
    trim: true,
    index: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  shortDescription: {
    type: String,
    required: true
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
  offerPrice: {
    type: Number
  },
  discount: {
    type: Number, // Percentage 0-100
    default: 0
  },
  stock: {
    type: Number,
    required: true,
    default: 0
  },
  brand: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  subCategory: {
    type: String
  },
  images: [
    {
      url: { type: String, required: true },
      public_id: { type: String }
    }
  ],
  thumbnail: {
    url: { type: String },
    public_id: { type: String }
  },
  variants: [variantSchema],
  specifications: [specificationSchema],
  features: [{
    type: String
  }],
  tags: [{
    type: String,
    index: true
  }],
  searchKeywords: [{
    type: String,
    index: true
  }],
  ratingSummary: {
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    ratings: {
      5: { type: Number, default: 0 },
      4: { type: Number, default: 0 },
      3: { type: Number, default: 0 },
      2: { type: Number, default: 0 },
      1: { type: Number, default: 0 }
    }
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'archived'],
    default: 'pending'
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isNewArrival: {
    type: Boolean,
    default: false
  },
  isTrending: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Text index for optimized full-text search
productSchema.index({
  title: 'text',
  brand: 'text',
  category: 'text',
  tags: 'text',
  searchKeywords: 'text'
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
