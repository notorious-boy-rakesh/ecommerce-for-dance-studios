/**
 * Wraps async route handlers to automatically catch errors
 * and pass them to the global error handler (next).
 * Eliminates repetitive try/catch in every controller.
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
