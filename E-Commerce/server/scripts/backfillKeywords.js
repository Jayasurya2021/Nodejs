require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('../models/productModel');
const { generateKeywords } = require('../utils/geminiAI');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const backfill = async () => {
  await connectDB();
  
  try {
    const products = await Product.find({});
    console.log(`Found ${products.length} products to process...`);
    
    let updatedCount = 0;
    
    for (const product of products) {
      if (!product.searchKeywords || product.searchKeywords.length === 0) {
        console.log(`Generating keywords for: ${product.title}`);
        
        const keywords = await generateKeywords({
          title: product.title,
          description: product.description,
          category: product.category,
          brand: product.brand,
          tags: product.tags,
          features: product.features
        });
        
        if (keywords && keywords.length > 0) {
          product.searchKeywords = keywords;
          await product.save();
          console.log(`✅ Saved ${keywords.length} keywords for ${product.title}`);
          updatedCount++;
        } else {
          console.log(`⚠️ No keywords generated for ${product.title}`);
        }
        
        // Sleep for 2 seconds to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 2000));
      } else {
        console.log(`⏭️ Skipping ${product.title}, already has keywords.`);
      }
    }
    
    console.log(`\n🎉 Backfill complete! Updated ${updatedCount} products.`);
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
};

backfill();
