const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/productModel');
const { generateKeywords } = require('../utils/geminiAI');

// @desc    Fetch all products with pagination, filtering & sorting
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 12;
  const page = Number(req.query.page) || 1;
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const filter = {};
  if (req.query.category) filter.category = req.query.category;
  if (req.query.brand) filter.brand = req.query.brand;
  if (req.query.isNewArrival) filter.isNewArrival = req.query.isNewArrival === 'true';
  if (req.query.status) filter.status = req.query.status;
  else filter.status = 'approved'; // Default to approved products for public view
  
  // Price filter
  if (req.query.minPrice || req.query.maxPrice) {
    filter.price = {};
    if (req.query.minPrice) filter.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) filter.price.$lte = Number(req.query.maxPrice);
  }

  // Sort
  let sortObj = {};
  switch (req.query.sort) {
    case 'lowest':
      sortObj = { price: 1 };
      break;
    case 'highest':
      sortObj = { price: -1 };
      break;
    case 'newest':
      sortObj = { createdAt: -1 };
      break;
    default:
      sortObj = { createdAt: -1 };
  }

  const count = await Product.countDocuments({ ...keyword, ...filter });
  const products = await Product.find({ ...keyword, ...filter })
    .sort(sortObj)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), count });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Get related products
// @route   GET /api/products/:id/related
// @access  Public
const getRelatedProducts = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  // Create an aggregation pipeline to find related products based on priority
  // Priority: 1. Category, 2. Brand, 3. Tags, 4. AI Keywords
  const relatedProducts = await Product.aggregate([
    {
      $match: {
        _id: { $ne: product._id }, // Exclude current product
        status: 'approved'
      }
    },
    {
      $addFields: {
        score: {
          $add: [
            { $cond: [{ $eq: ['$category', product.category] }, 10, 0] },
            { $cond: [{ $eq: ['$brand', product.brand] }, 8, 0] },
            { $size: { $setIntersection: ['$tags', product.tags || []] } },
            { $size: { $setIntersection: ['$searchKeywords', product.searchKeywords || []] } }
          ]
        }
      }
    },
    { $match: { score: { $gt: 0 } } },
    { $sort: { score: -1, 'ratingSummary.averageRating': -1 } },
    { $limit: 8 }
  ]);

  res.json(relatedProducts);
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Seller or Admin
const createProduct = asyncHandler(async (req, res) => {
  // Generate initial dummy product for seller/admin to edit
  const product = new Product({
    title: 'Sample Product Title',
    slug: 'sample-product-slug-' + Date.now(),
    shortDescription: 'Sample short description',
    description: 'Sample detailed description',
    price: 0,
    brand: 'Sample Brand',
    category: 'Sample Category',
    stock: 0,
    seller: req.user._id,
    createdBy: req.user._id,
    images: [{ url: 'https://via.placeholder.com/600x800?text=Premium+Fashion' }],
    status: req.user.role === 'admin' ? 'approved' : 'pending'
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Seller or Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (req.user.role === 'seller' && product.seller.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to update this product');
    }

    // Update simple fields
    const fieldsToUpdate = [
      'title', 'slug', 'shortDescription', 'description', 'price', 
      'offerPrice', 'discount', 'stock', 'brand', 'category', 'subCategory', 
      'images', 'thumbnail', 'variants', 'specifications', 'features', 
      'tags', 'status', 'isNewArrival', 'isTrending'
    ];

    fieldsToUpdate.forEach(field => {
      if (req.body[field] !== undefined) {
        if (field === 'status' && req.user.role !== 'admin') {
          return; // Sellers cannot manually change status
        }
        product[field] = req.body[field];
      }
    });

    product.updatedBy = req.user._id;

    // Call Gemini AI to generate searchKeywords automatically
    // We do this if title, description, category, brand, tags, or features have changed
    // To simplify, we generate it on every update that provides these fields
    if (
      req.body.title || req.body.description || req.body.category || 
      req.body.brand || req.body.tags || req.body.features
    ) {
      const keywords = await generateKeywords({
        title: product.title,
        description: product.description,
        category: product.category,
        brand: product.brand,
        tags: product.tags,
        features: product.features
      });

      if (keywords && keywords.length > 0) {
        product.searchKeywords = keywords;
      }
    }

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Seller or Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    if (req.user.role === 'seller' && product.seller.toString() !== req.user._id.toString()) {
      res.status(403);
      throw new Error('Not authorized to delete this product');
    }
    
    await Product.deleteOne({ _id: product._id });
    res.json({ message: 'Product removed' });
  } else {
    res.status(404);
    throw new Error('Product not found');
  }
});

module.exports = {
  getProducts,
  getProductById,
  getRelatedProducts,
  createProduct,
  updateProduct,
  deleteProduct
};
