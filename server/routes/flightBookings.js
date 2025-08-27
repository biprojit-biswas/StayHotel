// // server/routes/flightBookings.js
// const express = require('express');
// const router = express.Router();
// const FlightBooking = require('../models/FlightBooking');
// const auth = require('./middleware');

// // Route to handle flight booking requests
// router.post('/', auth, async (req, res) => {
//   const { from, to, departureDate, returnDate, passengers, bookingClass } = req.body;
  
//   try {
//     const newFlightBooking = new FlightBooking({
//       userId: req.user,
//       from,
//       to,
//       departureDate,
//       returnDate,
//       passengers,
//       bookingClass,
//     });
    
//     await newFlightBooking.save();
//     res.status(201).json({ msg: 'Flight booking successful!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Route to get a user's flight bookings (for a future "My Bookings" feature)
// router.get('/myflights', auth, async (req, res) => {
//   try {
//     const bookings = await FlightBooking.find({ userId: req.user });
//     res.json(bookings);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;


// server/routes/flightBookings.js
const express = require('express');
const router = express.Router();
const FlightBooking = require('../models/FlightBooking');
const auth = require('./middleware');

// Route to handle flight booking requests
router.post('/', auth, async (req, res) => {
  const { from, to, departureDate, returnDate, passengers, bookingClass, totalPrice } = req.body;
  
  try {
    const newFlightBooking = new FlightBooking({
      userId: req.user,
      from,
      to,
      departureDate,
      returnDate,
      passengers,
      bookingClass,
      totalPrice,
    });
    
    await newFlightBooking.save();
    res.status(201).json({ msg: 'Flight booking successful!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to get a user's flight bookings
router.get('/myflights', auth, async (req, res) => {
  try {
    const bookings = await FlightBooking.find({ userId: req.user });
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// New DELETE route to cancel a flight booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await FlightBooking.findOne({ _id: req.params.id, userId: req.user });
    
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found or not authorized' });
    }
    
    await FlightBooking.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: 'Flight booking canceled successfully' });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;