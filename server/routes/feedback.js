const express = require('express');
const router = express.Router();
const Feedback = require('../models/Review'); // Assuming you have a Feedback model

// Get all feedback
router.get('/', async (req, res) => {
  try {
    const feedback = await Feedback.find();
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;