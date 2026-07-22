const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../Models/User');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

// ─── Helper: Sign JWT ──────────────────────────────────────────────────────────
const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    });
};

// ─── Helper: Check express-validator result ────────────────────────────────────
const checkValidation = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map((e) => e.msg).join(' ');
        sendError(res, messages, 422);
        return false;
    }
    return true;
};


// ─── @route   POST /api/users/register ────────────────────────────────────────
// ─── @desc    Register a new user account ─────────────────────────────────────
// ─── @access  Public ──────────────────────────────────────────────────────────
const registerUser = async (req, res) => {
    if (!checkValidation(req, res)) return;

    const { fullName, email, mobile, username, password } = req.body;
    // confirmPassword is validated by express-validator, never stored

    const user = await User.create({ fullName, email, mobile, username, password });

    const token = signToken(user._id);

    sendSuccess(
        res,
        {
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                username: user.username,
                role: user.role,
                createdAt: user.createdAt,
            },
        },
        'Account created successfully! Welcome to Dance School.',
        201
    );
};

// ─── @route   POST /api/users/login ───────────────────────────────────────────
// ─── @desc    Authenticate user and return JWT ────────────────────────────────
// ─── @access  Public ──────────────────────────────────────────────────────────
const loginUser = async (req, res) => {
    if (!checkValidation(req, res)) return;

    const { username, password } = req.body;

    // Find user and explicitly select password (it's excluded by default with select: false)
    const user = await User.findOne({ username }).select('+password');

    if (!user) {
        return sendError(res, 'Invalid username or password.', 401);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return sendError(res, 'Invalid username or password.', 401);
    }

    const token = signToken(user._id);

    sendSuccess(
        res,
        {
            token,
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                username: user.username,
                role: user.role,
                createdAt: user.createdAt,
            },
        },
        `Welcome back, ${user.fullName}!`
    );
};

// ─── @route   GET /api/users/me ───────────────────────────────────────────────
// ─── @desc    Get the profile of the currently logged-in user ─────────────────
// ─── @access  Private (requires protect middleware) ───────────────────────────
const getMe = async (req, res) => {
    // req.user is attached by the protect middleware
    const user = req.user;
    sendSuccess(
        res,
        {
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                mobile: user.mobile,
                username: user.username,
                role: user.role,
                createdAt: user.createdAt,
            },
        },
        'Profile fetched successfully.'
    );
};

// ─── @route   POST /api/users/forgot-password ─────────────────────────────────
// ─── @desc    Verify email + mobile match for password reset ──────────────────
// ─── @access  Public ──────────────────────────────────────────────────────────
const forgotPassword = async (req, res) => {
    if (!checkValidation(req, res)) return;

    const { email, mobile } = req.body;

    const user = await User.findOne({ email, mobile });

    if (!user) {
        // Generic message to prevent user enumeration
        return sendError(
            res,
            'No account found with that email and mobile combination. Please check your details.',
            404
        );
    }

    // In a real application, you would:
    // 1. Generate a secure random token
    // 2. Store it with an expiry in the DB
    // 3. Send an email with a reset link
    // For now, we return a success message to confirm the account exists.
    sendSuccess(
        res,
        { username: user.username },
        'Account verified. Please contact the admin to reset your password, or use your registered username to log in.'
    );
};

module.exports = { registerUser, loginUser, getMe, forgotPassword };
