const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema(
    {
        studentName: {
            type: String,
            required: [true, 'Student name is required.'],
            trim: true,
            maxlength: [100, 'Student name cannot exceed 100 characters.'],
        },
        parentName: {
            type: String,
            trim: true,
            maxlength: [100, 'Parent name cannot exceed 100 characters.'],
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
        },
        mobile: {
            type: String,
            required: [true, 'Mobile number is required.'],
            trim: true,
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other', ''],
            default: '',
        },
        danceStyle: {
            type: String,
            trim: true,
        },
        batch: {
            type: String,
            trim: true,
        },
        ageGroup: {
            type: String,
            trim: true,
        },
        message: {
            type: String,
            trim: true,
            maxlength: [2000, 'Message cannot exceed 2000 characters.'],
        },
        status: {
            type: String,
            enum: ['pending', 'contacted', 'enrolled', 'rejected'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

const Enquiry = mongoose.model('Enquiry', enquirySchema);
module.exports = Enquiry;
