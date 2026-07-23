const mongoose = require('mongoose');
const eventSchema = new mongoose.Schema({
    name: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    venue: { type: String, required: true },
    description: { type: String, required: true },
    performanceSchedule: { type: String, required: true },
    img: { type: String, required: false }
}, { timestamps: true });
module.exports = mongoose.model('Event', eventSchema);