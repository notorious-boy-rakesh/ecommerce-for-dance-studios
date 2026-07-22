const mongoose = require('mongoose');
const feeSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    status: { type: String, enum: ['Paid', 'Pending'], required: true },
    dueDate: { type: String, required: true },
    payDate: { type: String, default: '' }
}, { timestamps: true });
module.exports = mongoose.model('Fee', feeSchema);