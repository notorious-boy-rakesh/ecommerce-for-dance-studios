/**
 * Standardized response helpers for consistent API shape.
 * All responses follow: { success, message, data }
 */

const sendSuccess = (res, data = {}, message = 'Success', statusCode = 200) => {
    res.status(statusCode).json({
        success: true,
        message,
        data,
    });
};

const sendError = (res, message = 'An error occurred', statusCode = 400) => {
    res.status(statusCode).json({
        success: false,
        message,
        data: null,
    });
};

module.exports = { sendSuccess, sendError };
