/**
 * Global Express Error Handler
 * Handles: Mongoose errors, JWT errors, validation errors, and generic errors.
 * Must be registered LAST in server.js (after all routes).
 */
const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Mongoose: duplicate key error (e.g., email or username already exists)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        message = `An account with ${field} '${value}' already exists. Please use a different ${field}.`;
        statusCode = 409;
    }

    // Mongoose: validation error (schema-level)
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map((e) => e.message);
        message = messages.join('. ');
        statusCode = 400;
    }

    // Mongoose: invalid ObjectId
    if (err.name === 'CastError') {
        message = `Invalid value for field '${err.path}'.`;
        statusCode = 400;
    }

    // JWT: invalid token
    if (err.name === 'JsonWebTokenError') {
        message = 'Invalid authentication token. Please log in again.';
        statusCode = 401;
    }

    // JWT: expired token
    if (err.name === 'TokenExpiredError') {
        message = 'Your session has expired. Please log in again.';
        statusCode = 401;
    }

    if (process.env.NODE_ENV === 'development') {
        console.error(`[ERROR] ${statusCode} — ${message}`);
        if (err.stack) console.error(err.stack);
    }

    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
    });
};

module.exports = errorHandler;
