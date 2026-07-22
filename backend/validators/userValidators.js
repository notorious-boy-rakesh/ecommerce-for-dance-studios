const { body } = require('express-validator');

const registerValidators = [
    body('fullName')
        .trim()
        .notEmpty().withMessage('Full name is required.')
        .isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters.'),

    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Please provide a valid email address.')
        .normalizeEmail(),

    body('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required.')
        .isMobilePhone('en-IN').withMessage('Please provide a valid 10-digit Indian mobile number.'),

    body('username')
        .trim()
        .notEmpty().withMessage('Username is required.')
        .isLength({ min: 3, max: 30 }).withMessage('Username must be between 3 and 30 characters.')
        .matches(/^[a-zA-Z0-9_]+$/).withMessage('Username can only contain letters, numbers, and underscores.'),

    body('password')
        .notEmpty().withMessage('Password is required.')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long.'),

    body('confirmPassword')
        .notEmpty().withMessage('Please confirm your password.')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Passwords do not match.');
            }
            return true;
        }),
];

const loginValidators = [
    body('username')
        .trim()
        .notEmpty().withMessage('Username is required.'),

    body('password')
        .notEmpty().withMessage('Password is required.'),
];

const forgotPasswordValidators = [
    body('email')
        .trim()
        .notEmpty().withMessage('Email is required.')
        .isEmail().withMessage('Please provide a valid email address.')
        .normalizeEmail(),

    body('mobile')
        .trim()
        .notEmpty().withMessage('Mobile number is required.')
        .isMobilePhone('en-IN').withMessage('Please provide a valid mobile number.'),
];

module.exports = { registerValidators, loginValidators, forgotPasswordValidators };
