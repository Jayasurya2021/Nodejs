/**
 * @file visionRoutes.js
 * @description Routes for AI vision analysis.
 */
const express = require('express');
const router = express.Router();
const multer = require('multer');
const { protect, isSellerOrAdmin } = require('../middleware/authMiddleware');
const { analyzeImages } = require('../services/geminiVisionService');

// Use memory storage so we don't save to disk/Cloudinary during AI analysis
const uploadMem = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 } // limit to 5MB per image to save API bandwidth
});

// @route   POST /api/vision/detect-colors
// @desc    Analyze uploaded images with Gemini Vision API
// @access  Private/Seller
router.post('/detect-colors', protect, isSellerOrAdmin, uploadMem.array('images', 10), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No images provided for analysis.' });
    }

    const { variants } = await analyzeImages(req.files);
    
    res.json({ variants });
  } catch (error) {
    console.error("Vision Analysis Error:", error);
    res.status(500).json({ 
      message: error.message || 'Failed to analyze images.' 
    });
  }
});

module.exports = router;
