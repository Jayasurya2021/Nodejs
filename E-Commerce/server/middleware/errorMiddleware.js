/**
 * @file errorMiddleware.js
 * @description Global error handling middleware for Express 4 & 5.
 * Compatible with asyncHandler pattern — all errors thrown in controllers
 * are caught here automatically.
 */

// ─── 404 Not Found ──────────────────────────────────────────────────────────
/**
 * Runs when no route matches the incoming request.
 * Creates a structured 404 error and forwards to errorHandler.
 */
const notFound = (req, res, next) => {
  const error = new Error(`Route not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// ─── Global Error Handler ───────────────────────────────────────────────────
/**
 * Catches every error forwarded via next(err) or thrown inside asyncHandler.
 * Must have exactly 4 parameters (err, req, res, next) to be recognized by Express.
 */
const errorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  // Use the status code already set on the response (e.g. res.status(401)),
  // but default to 500 if the response is still 200 (means no explicit status was set).
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  // Log full error details in development
  if (process.env.NODE_ENV === 'development') {
    console.error(
      `\n[${new Date().toISOString()}] ❌ ${req.method} ${req.originalUrl} → ${statusCode}\n` +
      `Message: ${err.message}\n` +
      `Stack:\n${err.stack}\n`
    );
  }

  // Handle Mongoose CastError (invalid ObjectId)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    err.message = 'Resource not found';
    res.status(404);
    return res.json({
      success: false,
      message: 'Resource not found',
      stack: null
    });
  }

  // Handle Mongoose duplicate key error (e.g. duplicate email)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'field';
    err.message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    res.status(400);
  }

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((e) => e.message);
    err.message = messages.join('. ');
    res.status(400);
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = { notFound, errorHandler };
