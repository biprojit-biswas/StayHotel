// server/models/FlightBooking.js
const mongoose = require('mongoose');

const flightBookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date },
  passengers: { type: Number, required: true, default: 1 },
  class: { type: String, enum: ['Economy', 'Business', 'First Class'], required: true, default: 'Economy' },
  totalPrice: { type: Number, required: true },
  bookedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('FlightBooking', flightBookingSchema);