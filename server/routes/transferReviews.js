// server/routes/transferReviews.js
const express = require('express');
const router = express.Router();
const TransferReview = require('../models/TransferReview');
const PrivateTransfer = require('../models/PrivateTransfer');
const auth = require('./middleware');

// Add a new review for a transfer
router.post('/', auth, async (req, res) => {
  const { transferId, rating, comment } = req.body;
  
  try {
    const hasBooked = await PrivateTransfer.findOne({ userId: req.user, _id: transferId });
    if (!hasBooked) {
      return res.status(403).json({ msg: 'You can only review transfers you have booked.' });
    }

    const hasReviewed = await TransferReview.findOne({ userId: req.user, transferId });
    if (hasReviewed) {
      return res.status(400).json({ msg: 'You have already reviewed this transfer.' });
    }

    const newReview = new TransferReview({
      userId: req.user,
      transferId,
      rating,
      comment,
    });
    
    await newReview.save();
    res.status(201).json({ msg: 'Transfer review submitted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get all reviews for a specific transfer
router.get('/:transferId', async (req, res) => {
  try {
    const reviews = await TransferReview.find({ transferId: req.params.transferId }).populate('userId', 'username');
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
