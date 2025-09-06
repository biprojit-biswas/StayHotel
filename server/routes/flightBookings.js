// // server/routes/flightBookings.js
// const express = require('express');
// const router = express.Router();
// const FlightBooking = require('../models/FlightBooking');
// const auth = require('./middleware');

// // Create a new flight booking
// router.post('/', auth, async (req, res) => {
//   const { from, to, departureDate, returnDate, passengers, class: flightClass, totalPrice } = req.body;
  
//   try {
//     const newFlightBooking = new FlightBooking({
//       userId: req.user,
//       from,
//       to,
//       departureDate,
//       returnDate,
//       passengers,
//       class: flightClass,
//       totalPrice,
//     });
    
//     await newFlightBooking.save();
//     res.status(201).json({ msg: 'Flight booked successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get all flight bookings for the authenticated user
// router.get('/myflights', auth, async (req, res) => {
//     try {
//         const flights = await FlightBooking.find({ userId: req.user });
//         res.json(flights);
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: 'Server error' });
//     }
// });

// module.exports = router;

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

// Delete a flight booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const flight = await FlightBooking.findOne({ _id: req.params.id, userId: req.user });
    
    if (!flight) {
      return res.status(404).json({ msg: 'Flight not found or not authorized' });
    }
    
    await FlightBooking.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: 'Flight canceled successfully' });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;