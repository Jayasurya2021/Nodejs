/**
 * @file server.js
 * @description Express application entry point.
 * All routes are registered before the global error handlers (notFound, errorHandler).
 */

const express = require('express');
const path = require('path');
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
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── CORS ────────────────────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? process.env.CLIENT_URL || 'https://your-production-domain.com'
    : [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/],
  credentials: true
}));

// ─── Socket.io Setup ─────────────────────────────────────────────────────────
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production'
      ? process.env.CLIENT_URL || 'https://your-production-domain.com'
      : [/^http:\/\/localhost:\d+$/, /^http:\/\/127\.0\.0\.1:\d+$/],
    credentials: true
  }
});

const Message = require('./models/messageModel');

// Keep track of connected users
const activeUsers = new Map();

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId); // Users join their own room
    activeUsers.set(userId, socket.id);
    console.log(`User ${userId} joined their room.`);
    
    // Admins join an 'admin' room too
    socket.on('join_admin', () => {
      socket.join('admin');
      console.log(`User ${userId} joined admin room.`);
    });
  });

  socket.on('send_message', async (data) => {
    try {
      const { sender, receiver, text, isFromAdmin } = data;
      const message = new Message({
        sender,
        receiver,
        text,
        isFromAdmin
      });
      await message.save();

      const populatedMessage = await Message.findById(message._id)
        .populate('sender', 'name profileImage')
        .populate('receiver', 'name profileImage');

      // Send to receiver's room
      if (receiver) {
        io.to(receiver).emit('receive_message', populatedMessage);
      }
      
      // If it's to admin, send to admin room
      if (!isFromAdmin) {
         io.to('admin').emit('receive_message', populatedMessage);
      }

      // Also send back to sender to confirm
      io.to(sender).emit('receive_message', populatedMessage);

    } catch (err) {
      console.error('Error saving message:', err);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove from activeUsers if needed
    for (let [key, value] of activeUsers.entries()) {
      if (value === socket.id) {
        activeUsers.delete(key);
        break;
      }
    }
  });
});

// ─── Security & Logging ──────────────────────────────────────────────────────
app.use(helmet({
  crossOriginResourcePolicy: false,
}));

// ─── Static ──────────────────────────────────────────────────────────────────
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

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
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/security', require('./routes/securityRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// ─── Error Handling (MUST be last) ───────────────────────────────────────────
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);    // 404 handler — catches unmatched routes
app.use(errorHandler); // Global error handler — catches all thrown errors

// ─── Start Server ────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(` Server running in ${process.env.NODE_ENV || 'development'} mode on port ${PORT}`);
});
