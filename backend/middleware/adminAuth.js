const { sendError } = require('../utils/responseFormatter');

const adminProtect = (req, res, next) => {
    const adminSecret = req.headers['x-admin-secret'];

    // In a real app, this should be validated properly, e.g., using a JWT or a strong env secret
    // For this simple implementation, we'll check against a static secret or env var
    const expectedSecret = process.env.ADMIN_SECRET || 'super-secret-admin-key-2026';

    if (adminSecret && adminSecret === expectedSecret) {
        next();
    } else {
        return sendError(res, 'Not authorized as an admin', 401);
    }
};

module.exports = { adminProtect };
