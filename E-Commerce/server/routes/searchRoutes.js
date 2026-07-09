const express = require('express');
const router = express.Router();
const {
  getSearchSuggestions,
  searchProducts
} = require('../controllers/searchController');

router.route('/').get(searchProducts);
router.route('/suggestions').get(getSearchSuggestions);

module.exports = router;
