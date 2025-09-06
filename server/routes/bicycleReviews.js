// server/routes/bicycleReviews.js
const express = require('express');
const router = express.Router();
const BicycleReview = require('../models/BicycleReview');
const BicycleRental = require('../models/BicycleRental');
const auth = require('./middleware');

// Add a new review for a bicycle rental
router.post('/', auth, async (req, res) => {
  const { rentalId, rating, comment } = req.body;
  
  try {
    const hasRented = await BicycleRental.findOne({ userId: req.user, _id: rentalId });
    if (!hasRented) {
      return res.status(403).json({ msg: 'You can only review rentals you have booked.' });
    }

    const hasReviewed = await BicycleReview.findOne({ userId: req.user, rentalId });
    if (hasReviewed) {
      return res.status(400).json({ msg: 'You have already reviewed this bicycle rental.' });
    }

    const newReview = new BicycleReview({
      userId: req.user,
      rentalId,
      rating,
      comment,
    });
    
    await newReview.save();
    res.status(201).json({ msg: 'Bicycle review submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all reviews for a specific rental
router.get('/:rentalId', async (req, res) => {
  try {
    const reviews = await BicycleReview.find({ rentalId: req.params.rentalId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;