// server/routes/flightBookings.js
const express = require('express');
const router = express.Router();
const FlightBooking = require('../models/FlightBooking');
const auth = require('./middleware');

// Create a new flight booking
router.post('/', auth, async (req, res) => {
  const { from, to, departureDate, returnDate, passengers, class: flightClass, totalPrice } = req.body;
  
  try {
    const newFlightBooking = new FlightBooking({
      userId: req.user,
      from,
      to,
      departureDate,
      returnDate,
      passengers,
      class: flightClass,
      totalPrice,
    });
    
    await newFlightBooking.save();
    res.status(201).json({ msg: 'Flight booked successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all flight bookings for the authenticated user
router.get('/myflights', auth, async (req, res) => {
    try {
        const flights = await FlightBooking.find({ userId: req.user });
        res.json(flights);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;