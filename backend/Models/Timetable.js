const mongoose = require('mongoose');
const timetableSchema = new mongoose.Schema({
    type: { type: String, required: true },
    trainer: { type: String, required: true },
    day: { type: String, required: true },
    dayClass: { type: String, required: true },
    time: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Timetable', timetableSchema);