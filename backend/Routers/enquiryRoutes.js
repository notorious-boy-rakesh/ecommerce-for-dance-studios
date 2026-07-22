const express = require('express');
const router = express.Router();
const { submitEnquiry, enquiryValidators } = require('../Controllers/enquiryController');

// @route   POST /api/enquiry
router.post('/', ...enquiryValidators, submitEnquiry);

module.exports = router;
