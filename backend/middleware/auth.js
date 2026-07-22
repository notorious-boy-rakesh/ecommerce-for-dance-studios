const jwt = require('jsonwebtoken');
const User = require('../Models/User');

/**
 * protect — Verifies JWT and attaches the authenticated user to req.user.
 * Use on any route that requires a logged-in user.
 * Express v5 natively handles async errors — no asyncHandler wrapper needed.
 */
const protect = async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer ')
    ) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized — no token provided.');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch fresh user from DB (ensures deleted/disabled users are blocked)
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
        res.status(401);
        throw new Error('Not authorized — user no longer exists.');
    }

    req.user = user;
    next();
};

/**
 * adminOnly — Must be used AFTER protect middleware.
 * Blocks non-admin users from accessing the route.
 */
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403);
        throw new Error('Forbidden — admin access only.');
    }
};

module.exports = { protect, adminOnly };
