const express = require('express');
const router = express.Router();
const { submitContact, contactValidators } = require('../Controllers/contactController');

// @route   POST /api/contact
router.post('/', ...contactValidators, submitContact);

module.exports = router;
