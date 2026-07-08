const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const Order = require('../models/orderModel');
const connectDB = require('../config/db');

dotenv.config({ path: '../.env' }); // Adjust if needed
connectDB();

const generateProducts = () => {
  const products = [];
  const categories = ['Shirts', 'Jeans', 'Jackets', 'Hoodies', 'Accessories', 'Sneakers'];
  const brands = ['Zara', 'H&M', 'Massimo Dutti', 'COS', 'Uniqlo'];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'White', hex: '#ffffff' },
    { name: 'Navy', hex: '#000080' },
    { name: 'Beige', hex: '#f5f5dc' },
    { name: 'Olive', hex: '#808000' },
  ];
  const sizes = ['S', 'M', 'L', 'XL'];

  // Fashion placeholder images from unsplash or placeholders
  const images = [
    'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600&auto=format&fit=crop', // Jacket
    'https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=600&auto=format&fit=crop', // Shirt
    'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=600&auto=format&fit=crop', // Jeans
    'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=600&auto=format&fit=crop', // Hoodie
    'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=600&auto=format&fit=crop', // Sneakers
  ];

  for (let i = 1; i <= 100; i++) {
    const category = categories[i % categories.length];
    const brand = brands[i % brands.length];
    
    products.push({
      name: `Premium ${brand} ${category} ${i}`,
      description: `Elevate your wardrobe with this premium ${category.toLowerCase()} from ${brand}. Crafted from high-quality materials for ultimate comfort and durability. Perfect for any luxury minimal style.`,
      price: Math.floor(Math.random() * (200 - 30 + 1) + 30),
      images: [
        { url: images[i % images.length], public_id: `img_${i}` }
      ],
      brand: brand,
      category: category,
      sizes: sizes,
      colors: [colors[i % colors.length], colors[(i + 1) % colors.length]],
      material: '100% Cotton',
      countInStock: Math.floor(Math.random() * 50) + 5,
      rating: (Math.random() * (5 - 3) + 3).toFixed(1), // Random rating between 3 and 5
      numReviews: Math.floor(Math.random() * 50),
      isNewArrival: i % 10 === 0,
      isTrending: i % 15 === 0,
      discount: i % 20 === 0 ? 15 : 0 // 15% discount every 20th product
    });
  }
  return products;
};

const importData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: 'password123',
        role: 'admin'
      },
      {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password123'
      }
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = generateProducts().map(product => {
      return { ...product, user: adminUser };
    });

    await Product.insertMany(sampleProducts);

    console.log('Data Imported successfully!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
