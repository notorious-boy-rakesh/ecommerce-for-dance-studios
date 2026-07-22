const { body, validationResult } = require('express-validator');
const Contact = require('../Models/Contact');
const asyncHandler = require('../middleware/asyncHandler');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

// ─── @route   POST /api/contact ───────────────────────────────────────────────
// ─── @desc    Save a contact form submission ──────────────────────────────────
// ─── @access  Public ──────────────────────────────────────────────────────────
const submitContact = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map((e) => e.msg).join(' ');
        return sendError(res, messages, 422);
    }

    const { name, email, mobile, subject, message } = req.body;

    const contact = await Contact.create({ name, email, mobile, subject, message });

    sendSuccess(
        res,
        { id: contact._id },
        'Thank you for reaching out! We will get back to you within 24 hours.',
        201
    );
};

const contactValidators = [
    body('name').trim().notEmpty().withMessage('Your name is required.'),
    body('email').trim().isEmail().withMessage('A valid email address is required.').normalizeEmail(),
    body('message').trim().notEmpty().withMessage('Message cannot be empty.')
        .isLength({ max: 2000 }).withMessage('Message cannot exceed 2000 characters.'),
];

module.exports = { submitContact, contactValidators };
