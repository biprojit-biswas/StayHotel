// server/models/BicycleRental.js
const mongoose = require('mongoose');

const bicycleRentalSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bicycleType: { type: String, required: true }, // e.g., 'Mountain Bike', 'City Bike'
  rentalDate: { type: Date, required: true },
  rentalDuration: { type: Number, required: true }, // in hours
  totalPrice: { type: Number, required: true },
  bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BicycleRental', bicycleRentalSchema);
