/**
 * @file asyncHandler.js
 * @description Wraps async route handlers to automatically forward errors to
 * Express's global error handler (next). Eliminates the need for try/catch
 * blocks in every controller. Compatible with Express 4 & 5.
 *
 * Usage:
 *   const asyncHandler = require('../middleware/asyncHandler');
 *
 *   const myController = asyncHandler(async (req, res) => {
 *     // If this throws, Express errorHandler catches it automatically.
 *     throw new Error('Something went wrong');
 *   });
 */
const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;
