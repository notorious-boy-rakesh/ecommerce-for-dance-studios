const { body, validationResult } = require('express-validator');
const Enquiry = require('../Models/Enquiry');
const asyncHandler = require('../middleware/asyncHandler');
const { sendSuccess, sendError } = require('../utils/responseFormatter');

// ─── @route   POST /api/enquiry ───────────────────────────────────────────────
// ─── @desc    Save an admission enquiry form submission ───────────────────────
// ─── @access  Public ──────────────────────────────────────────────────────────
const submitEnquiry = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map((e) => e.msg).join(' ');
        return sendError(res, messages, 422);
    }

    const { studentName, parentName, email, mobile, gender, danceStyle, batch, ageGroup, message } = req.body;

    const enquiry = await Enquiry.create({
        studentName, parentName, email, mobile, gender, danceStyle, batch, ageGroup, message,
    });

    sendSuccess(
        res,
        { id: enquiry._id },
        'Your enquiry has been submitted successfully! Our team will contact you within 48 hours.',
        201
    );
};

const enquiryValidators = [
    body('studentName').trim().notEmpty().withMessage('Student name is required.'),
    body('email').trim().isEmail().withMessage('A valid email address is required.').normalizeEmail(),
    body('mobile').trim().notEmpty().withMessage('Mobile number is required.'),
];

module.exports = { submitEnquiry, enquiryValidators };
