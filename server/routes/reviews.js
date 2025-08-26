// server/routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');
const Booking = require('../models/Booking');
const auth = require('./middleware');

// Add a new review
router.post('/', auth, async (req, res) => {
  const { roomId, rating, comment } = req.body;
  
  try {
    // Check if the user has a booking for this room
    const hasBooked = await Booking.findOne({ userId: req.user, roomId });
    if (!hasBooked) {
      return res.status(403).json({ msg: 'You can only review rooms you have booked.' });
    }

    // Check if the user has already reviewed this room
    const hasReviewed = await Review.findOne({ userId: req.user, roomId });
    if (hasReviewed) {
      return res.status(400).json({ msg: 'You have already reviewed this room.' });
    }

    const newReview = new Review({
      userId: req.user,
      roomId,
      rating,
      comment,
    });
    
    await newReview.save();
    res.status(201).json({ msg: 'Review submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all reviews for a specific room
router.get('/:roomId', async (req, res) => {
  try {
    const reviews = await Review.find({ roomId: req.params.roomId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

