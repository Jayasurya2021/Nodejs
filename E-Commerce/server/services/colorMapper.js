/**
 * @file colorMapper.js
 * @description Standardizes color names for consistent grouping.
 */

const normalizeColorName = (colorName) => {
  if (!colorName) return 'Unknown';
  
  // Trim and convert to title case
  return colorName
    .trim()
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

module.exports = {
  normalizeColorName
};
