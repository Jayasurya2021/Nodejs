/**
 * @file server.js
 * @description Express application entry point.
 * All routes are registered before the global error handlers (notFound, errorHandler).
 */

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// ─── Load Environment Variables ──────────────────────────────────────────────
// dotenvx (via nodemon config) injects from ../.env; this is a fallback for
// running node server.js directly.
dotenv.config({ path: '.env' });

// ─── Database ────────────────────────────────────────────────────────────────
connectDB();

const app = express();

// ─── Core Middleware ─────────────────────────────────────────────────────────
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── CORS ────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || 'https://your-production-domain.com'
    : 'http://localhost:5173',
  credentials: true
}));

// ─── Security & Logging ──────────────────────────────────────────────────────
app.use(helmet());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// ─── Static ──────────────────────────────────────────────────────────────────
app.use('/uploads', express.static('uploads'));

// ─── Health Check ────────────────────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ success: true, message: 'LUXE API is running...', env: process.env.NODE_ENV });
});

// ─── API Routes ──────────────────────────────────────────────────────────────
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/search', require('./routes/searchRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/seller', require('./routes/sellerRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));

// ─── Error Handling (MUST be last) ───────────────────────────────────────────
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);    // 404 handler — catches unmatched routes
app.use(errorHandler); // Global error handler — catches all thrown errors

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
