// server/routes/bicycleRentals.js
const express = require('express');
const router = express.Router();
const BicycleRental = require('../models/BicycleRental');
const auth = require('./middleware');

// Create a new bicycle rental booking
router.post('/', auth, async (req, res) => {
  const { bicycleType, rentalDate, rentalDuration, totalPrice } = req.body;
  
  try {
    const newRental = new BicycleRental({
      userId: req.user,
      bicycleType,
      rentalDate,
      rentalDuration,
      totalPrice,
    });
    
    await newRental.save();
    res.status(201).json({ msg: 'Bicycle rental booked successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all bicycle rentals for the authenticated user
router.get('/myrentals', auth, async (req, res) => {
    try {
        const rentals = await BicycleRental.find({ userId: req.user });
        res.json(rentals);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// Delete a bicycle rental
router.delete('/:id', auth, async (req, res) => {
  try {
    const rental = await BicycleRental.findOne({ _id: req.params.id, userId: req.user });
    
    if (!rental) {
      return res.status(404).json({ msg: 'Rental not found or not authorized' });
    }
    
    await BicycleRental.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: 'Bicycle rental canceled successfully' });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
