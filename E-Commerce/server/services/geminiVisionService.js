/**
 * @file geminiVisionService.js
 * @description Interfaces with Google Gemini Vision API to analyze product images.
 */
const { GoogleGenAI } = require('@google/genai');
const { getPrompt, parseResponse } = require('./colorDetector');
const { buildVariants } = require('./variantBuilder');

const analyzeImages = async (files) => {
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is not configured in the server.');
  }

  // Initialize Gemini client here to avoid crashing server on startup
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });


  const results = [];
  
  // Analyze in parallel
  const analysisPromises = files.map(async (file) => {
    try {
      const base64Data = file.buffer.toString('base64');
      const mimeType = file.mimetype;

      const response = await ai.models.generateContent({
        model: 'gemini-1.5-flash',
        contents: [
          {
            role: 'user',
            parts: [
              { text: getPrompt() },
              { inlineData: { data: base64Data, mimeType } }
            ]
          }
        ],
        config: {
          temperature: 0.1, // low temperature for more deterministic output
        }
      });

      const parsed = parseResponse(response.text(), file.originalname);
      if (parsed) {
        results.push(parsed);
      }
    } catch (error) {
      console.error(`Error analyzing image ${file.originalname}:`, error);
      // We don't fail the whole request if one image fails, we just skip it or log it.
    }
  });

  await Promise.all(analysisPromises);
  
  // Build and group variants
  const variants = buildVariants(results);
  return { variants };
};

module.exports = {
  analyzeImages
};
