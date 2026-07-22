const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: [true, 'Full name is required.'],
            trim: true,
            minlength: [2, 'Full name must be at least 2 characters.'],
            maxlength: [100, 'Full name cannot exceed 100 characters.'],
        },
        email: {
            type: String,
            required: [true, 'Email is required.'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email address.'],
        },
        mobile: {
            type: String,
            required: [true, 'Mobile number is required.'],
            trim: true,
        },
        username: {
            type: String,
            required: [true, 'Username is required.'],
            unique: true,
            trim: true,
            minlength: [3, 'Username must be at least 3 characters.'],
            maxlength: [30, 'Username cannot exceed 30 characters.'],
            match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores.'],
        },
        password: {
            type: String,
            required: [true, 'Password is required.'],
            minlength: [6, 'Password must be at least 6 characters.'],
            select: false, // Never returned in queries by default
        },
        role: {
            type: String,
            enum: ['student', 'admin'],
            default: 'student',
        },
        batchId: {
            type: String,
            default: null,
        },
        status: {
            type: String,
            default: 'Active',
        },
        admissionDate: {
            type: String,
        },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt automatically
    }
);

// ─── Pre-save Hook: Hash Password ─────────────────────────────────────────────
// Only runs if password field was modified (prevents re-hashing on other updates)
// Mongoose v9: async hooks are promise-based — do NOT use next() callback
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
});

// ─── Instance Method: Compare Password ────────────────────────────────────────
userSchema.methods.comparePassword = async function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;
