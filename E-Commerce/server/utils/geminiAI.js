const { GoogleGenAI } = require('@google/genai');

/**
 * Generate search keywords for a product using Gemini AI
 * @param {Object} productDetails - Object containing product info (title, description, brand, category, tags, features)
 * @returns {Promise<Array<String>>} Array of keywords
 */
const generateKeywords = async (productDetails) => {
  try {
    // Return empty array if no API key is provided so we don't break the app
    if (!process.env.GEMINI_API_KEY) {
      console.warn('GEMINI_API_KEY is not set. Skipping keyword generation.');
      return [];
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const prompt = `
      You are an expert SEO and e-commerce specialist. 
      Generate 30 to 50 highly relevant search keywords for the following product.
      The keywords should include synonyms, related terms, specific use cases, and generic categories to maximize search discoverability.
      
      Product Name: ${productDetails.title}
      Description: ${productDetails.description || productDetails.shortDescription || ''}
      Category: ${productDetails.category}
      Brand: ${productDetails.brand}
      Tags: ${(productDetails.tags || []).join(', ')}
      Features: ${(productDetails.features || []).join(', ')}

      Return ONLY a JSON array of strings containing the keywords, completely unformatted. Do not include markdown formatting or the \`\`\`json block. Just the raw array e.g., ["keyword1", "keyword2"].
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: prompt,
    });

    const responseText = response.text;
    
    // Clean up potential markdown formatting if the model still includes it
    let cleanedText = responseText.replace(/```json/gi, '').replace(/```/g, '').trim();
    
    const keywords = JSON.parse(cleanedText);
    
    if (Array.isArray(keywords)) {
      // Lowercase and trim all keywords
      return keywords.map(k => k.toString().toLowerCase().trim());
    }
    
    return [];
  } catch (error) {
    console.error('Error generating AI keywords:', error);
    // Graceful fallback
    return [];
  }
};

module.exports = { generateKeywords };
