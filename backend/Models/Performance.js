const mongoose = require('mongoose');
const performanceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    album: { type: String, required: true },
    url: { type: String, required: true },
    date: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('Performance', performanceSchema);