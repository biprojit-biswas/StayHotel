const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Assuming you have a User model

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;