const mongoose = require('mongoose');
const teacherSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    mobile: { type: String, required: true },
    specialization: { type: String, required: true },
    experience: { type: String, required: true },
    bio: { type: String, required: true },
    img: { type: String, required: false }
}, { timestamps: true });
module.exports = mongoose.model('Teacher', teacherSchema);