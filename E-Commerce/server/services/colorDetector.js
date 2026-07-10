/**
 * @file colorDetector.js
 * @description Manages prompts and response parsing for the Gemini API.
 */

const getPrompt = () => {
  return `You are an AI assistant specialized in analyzing product images for an e-commerce platform.
Your task is to detect the PRIMARY color of the clothing or main product in the provided image.

CRITICAL INSTRUCTIONS:
1. Ignore the background color.
2. Ignore shadows.
3. Ignore human models (skin, hair, accessories).
4. Ignore hands, floors, walls, hangers, and packaging.
5. Focus ONLY on the clothing/product itself.
6. Provide a common, recognizable color name (e.g., "Blue", "Navy Blue", "Crimson").
7. Provide the closest corresponding HEX code for that color.
8. Provide a confidence score between 0 and 100 representing how sure you are about the detected color.

RETURN EXACTLY ONE JSON OBJECT. Do NOT wrap the JSON in markdown blocks (e.g., \`\`\`json) or add any extra text.

Example Output format:
{
  "colorName": "Blue",
  "colorHex": "#2563EB",
  "confidence": 97
}`;
};

const parseResponse = (responseText, originalFileName) => {
  try {
    // Strip markdown formatting if the model still includes it
    const cleanJson = responseText.replace(/```json\n?|```/g, '').trim();
    const data = JSON.parse(cleanJson);
    
    return {
      colorName: data.colorName || 'Unknown',
      colorHex: data.colorHex || '#000000',
      confidence: data.confidence || 0,
      images: [originalFileName]
    };
  } catch (error) {
    console.error("Failed to parse Gemini response:", responseText);
    return null;
  }
};

module.exports = {
  getPrompt,
  parseResponse
};
