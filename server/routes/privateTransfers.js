// server/routes/privateTransfers.js
const express = require('express');
const router = express.Router();
const PrivateTransfer = require('../models/PrivateTransfer');
const auth = require('./middleware');

// Create a new private transfer booking
router.post('/', auth, async (req, res) => {
  const { transferType, arrivalDate, arrivalTime, isRoundTrip, totalPrice } = req.body;
  
  try {
    const newTransfer = new PrivateTransfer({
      userId: req.user,
      transferType,
      arrivalDate,
      arrivalTime,
      isRoundTrip,
      totalPrice: totalPrice,
    });
    
    await newTransfer.save();
    res.status(201).json({ msg: 'Private transfer booked successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all private transfers for the authenticated user
router.get('/mytransfers', auth, async (req, res) => {
    try {
        const transfers = await PrivateTransfer.find({ userId: req.user });
        res.json(transfers);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// New DELETE route to cancel a transfer
router.delete('/:id', auth, async (req, res) => {
  try {
    const transfer = await PrivateTransfer.findOne({ _id: req.params.id, userId: req.user });
    
    if (!transfer) {
      return res.status(404).json({ msg: 'Transfer not found or not authorized' });
    }
    
    await PrivateTransfer.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: 'Transfer canceled successfully' });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;