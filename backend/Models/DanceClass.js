const mongoose = require('mongoose');
const classSchema = new mongoose.Schema({
    name: { type: String, required: true },
    desc: { type: String, required: true },
    img: { type: String, required: true },
    trainer: { type: String, required: true },
    timing: { type: String, required: true }
}, { timestamps: true });
module.exports = mongoose.model('DanceClass', classSchema);