/**
 * @file hexColorGenerator.js
 * @description Validates and formats hex colors.
 */

const formatHexColor = (hex) => {
  if (!hex) return '#000000';
  
  // Ensure starts with #
  let formatted = hex.startsWith('#') ? hex : `#${hex}`;
  
  // Basic validation (hex 3 or 6 chars)
  const hexRegex = /^#([0-9A-Fa-f]{3}){1,2}$/i;
  if (hexRegex.test(formatted)) {
    return formatted.toUpperCase();
  }
  
  return '#000000'; // Default fallback
};

module.exports = {
  formatHexColor
};
