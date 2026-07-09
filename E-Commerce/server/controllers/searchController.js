const asyncHandler = require('../middleware/asyncHandler');
const Product = require('../models/productModel');

// @desc    Get search suggestions for quick dropdown
// @route   GET /api/search/suggestions?q=
// @access  Public
const getSearchSuggestions = asyncHandler(async (req, res) => {
  const query = req.query.q;
  
  if (!query || query.length < 2) {
    return res.json([]);
  }

  // Create regex for partial matching
  const regex = new RegExp(query, 'i');

  const suggestions = await Product.aggregate([
    {
      $match: {
        $or: [
          { title: regex },
          { category: regex },
          { brand: regex },
          { tags: regex },
          { searchKeywords: regex } // Includes AI generated keywords
        ],
        status: 'active'
      }
    },
    {
      $project: {
        title: 1,
        slug: 1,
        brand: 1,
        category: 1,
        'thumbnail.url': 1,
        images: { $arrayElemAt: ['$images', 0] }
      }
    },
    { $limit: 5 } // Return top 5 suggestions
  ]);

  res.json(suggestions);
});

// @desc    Full optimized product search with pagination
// @route   GET /api/search?q=
// @access  Public
const searchProducts = asyncHandler(async (req, res) => {
  const query = req.query.q;
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const skip = (page - 1) * limit;

  if (!query) {
    return res.json({ products: [], total: 0, page, pages: 0 });
  }

  // Use MongoDB Text Search index for highly optimized full-text search
  const filter = {
    $text: { $search: query },
    status: 'active'
  };

  const count = await Product.countDocuments(filter);
  
  const products = await Product.find(filter, { score: { $meta: "textScore" } })
    .sort({ score: { $meta: "textScore" } }) // Sort by text relevance score
    .skip(skip)
    .limit(limit);

  res.json({
    products,
    total: count,
    page,
    pages: Math.ceil(count / limit)
  });
});

module.exports = {
  getSearchSuggestions,
  searchProducts
};
