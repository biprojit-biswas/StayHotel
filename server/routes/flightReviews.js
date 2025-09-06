// // server/routes/flightReviews.js
// const express = require('express');
// const router = express.Router();
// const FlightReview = require('../models/FlightReview');
// const FlightBooking = require('../models/FlightBooking');
// const auth = require('./middleware');

// // Add a new review for a flight
// router.post('/', auth, async (req, res) => {
//   const { flightId, rating, comment } = req.body;
  
//   try {
//     const hasBooked = await FlightBooking.findOne({ userId: req.user, _id: flightId });
//     if (!hasBooked) {
//       return res.status(403).json({ msg: 'You can only review flights you have booked.' });
//     }

//     const hasReviewed = await FlightReview.findOne({ userId: req.user, flightId });
//     if (hasReviewed) {
//       return res.status(400).json({ msg: 'You have already reviewed this flight.' });
//     }

//     const newReview = new FlightReview({
//       userId: req.user,
//       flightId,
//       rating,
//       comment,
//     });
    
//     await newReview.save();
//     res.status(201).json({ msg: 'Flight review submitted successfully!' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Get all reviews for a specific flight
// router.get('/:flightId', async (req, res) => {
//   try {
//     const reviews = await FlightReview.find({ flightId: req.params.flightId }).populate('userId', 'username');
//     res.json(reviews);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;

// server/routes/flightReviews.js
const express = require('express');
const router = express.Router();
const FlightReview = require('../models/FlightReview');
const FlightBooking = require('../models/FlightBooking');
const auth = require('./middleware');

// Add a new review for a flight
router.post('/', auth, async (req, res) => {
  const { flightId, rating, comment } = req.body;
  
  try {
    const hasBooked = await FlightBooking.findOne({ userId: req.user, _id: flightId });
    if (!hasBooked) {
      return res.status(403).json({ msg: 'You can only review flights you have booked.' });
    }

    const hasReviewed = await FlightReview.findOne({ userId: req.user, flightId });
    if (hasReviewed) {
      return res.status(400).json({ msg: 'You have already reviewed this flight.' });
    }

    const newReview = new FlightReview({
      userId: req.user,
      flightId,
      rating,
      comment,
    });
    
    await newReview.save();
    res.status(201).json({ msg: 'Flight review submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all reviews for a specific flight
router.get('/:flightId', async (req, res) => {
  try {
    const reviews = await FlightReview.find({ flightId: req.params.flightId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;