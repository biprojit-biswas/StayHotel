// server/models/BicycleReview.js
const mongoose = require('mongoose');

const bicycleReviewSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rentalId: { type: mongoose.Schema.Types.ObjectId, ref: 'BicycleRental', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BicycleReview', bicycleReviewSchema);