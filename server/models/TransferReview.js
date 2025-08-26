// server/models/TransferReview.js
const mongoose = require('mongoose');

const transferReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  transferId: { type: mongoose.Schema.Types.ObjectId, ref: 'PrivateTransfer', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('TransferReview', transferReviewSchema);
