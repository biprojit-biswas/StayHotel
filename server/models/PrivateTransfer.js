// server/models/PrivateTransfer.js
const mongoose = require('mongoose');

const privateTransferSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transferType: { type: String, required: true }, // e.g., 'Luxury Car', 'Taxi'
  arrivalDate: { type: Date, required: true },
  arrivalTime: { type: String, required: true },
  isRoundTrip: { type: Boolean, default: false },
  totalPrice: { type: Number, required: true },
  bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('PrivateTransfer', privateTransferSchema);

