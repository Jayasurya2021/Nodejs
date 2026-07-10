/**
 * @file variantBuilder.js
 * @description Groups detected colors and builds the variants array.
 */
const { normalizeColorName } = require('./colorMapper');
const { formatHexColor } = require('./hexColorGenerator');

const buildVariants = (aiResults) => {
  const variantMap = new Map();

  aiResults.forEach(result => {
    // If confidence is too low, we skip processing it here or let frontend filter it. 
    // We'll pass confidence down so frontend can make the decision, but group them anyway.
    const normName = normalizeColorName(result.colorName);
    const hex = formatHexColor(result.colorHex);
    
    if (variantMap.has(normName)) {
      const existing = variantMap.get(normName);
      existing.images.push(...result.images);
      // Optional: Update confidence to the highest one found
      if (result.confidence > existing.confidence) {
        existing.confidence = result.confidence;
      }
    } else {
      variantMap.set(normName, {
        colorName: normName,
        colorHex: hex,
        confidence: result.confidence,
        images: [...result.images]
      });
    }
  });

  return Array.from(variantMap.values());
};

module.exports = {
  buildVariants
};
