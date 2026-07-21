const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { protect, isSellerOrAdmin } = require('../middleware/authMiddleware');

const useCloudinary = process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_KEY !== 'your_api_key';

let storage;

if (useCloudinary) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
  });
  
  storage = multer.memoryStorage();
} else {
  const fs = require('fs');
  const path = require('path');
  const uploadDir = path.join(__dirname, '../uploads');
  
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname);
      cb(null, `${file.fieldname}-${Date.now()}${ext}`);
    }
  });
}

const upload = multer({ storage: storage });

router.post('/', protect, isSellerOrAdmin, upload.array('images', 10), async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  try {
    const uploadPromises = req.files.map(async (file) => {
      if (useCloudinary) {
        return new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'ecommerce_products',
              allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
              transformation: [{ width: 1000, height: 1000, crop: 'limit' }]
            },
            (error, result) => {
              if (error) return reject(error);
              resolve({
                url: result.secure_url || result.url,
                public_id: result.public_id
              });
            }
          );
          uploadStream.end(file.buffer);
        });
      } else {
        return {
          url: `${process.env.VITE_API_URL ? process.env.VITE_API_URL.replace('/api', '') : 'http://localhost:5000'}/uploads/${file.filename}`,
          public_id: file.filename
        };
      }
    });

    const uploadedImages = await Promise.all(uploadPromises);

    res.json({
      message: 'Images Uploaded Successfully',
      images: uploadedImages
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Error uploading images', error: error.message });
  }
});

module.exports = router;
