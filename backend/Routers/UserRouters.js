const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, forgotPassword } = require('../Controllers/userController');
const { protect } = require('../middleware/auth');
const { registerValidators, loginValidators, forgotPasswordValidators } = require('../validators/userValidators');

// @route   POST /api/users/register
router.post('/register', ...registerValidators, registerUser);

// @route   POST /api/users/login
router.post('/login', ...loginValidators, loginUser);

// @route   GET /api/users/me  (Protected)
router.get('/me', protect, getMe);

// @route   POST /api/users/forgot-password
router.post('/forgot-password', ...forgotPasswordValidators, forgotPassword);

module.exports = router;
