// server/routes/admin.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Review = require('../models/Review');
const TransferReview = require('../models/TransferReview');
const FlightReview = require('../models/FlightReview'); // Added FlightReview model
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('./middleware');

// Hardcoded admin credentials for a simple implementation
const ADMIN_EMAIL = 'admin@stayhotel.com';
const ADMIN_PASSWORD = 'adminpassword';

// Middleware to check for admin privileges
const adminAuth = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Find a user with this ID
    const user = await User.findById(decoded.id);
    // Check if the user's email matches the admin email
    if (!user || user.email !== ADMIN_EMAIL) {
      return res.status(403).json({ msg: 'Forbidden: You do not have admin access' });
    }
    req.user = decoded.id;
    next();
  } catch (e) {
    res.status(400).json({ msg: 'Token is not valid' });
  }
};

// Admin login route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    return res.status(400).json({ msg: 'Invalid credentials' });
  }

  // Create a token for the admin. Note: using a placeholder ID as we're not
  // creating a real User entry for the admin. In a real app, you would.
  const token = jwt.sign({ id: 'admin_id_placeholder' }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, msg: 'Admin login successful' });
});

// Get all reviews for the admin panel (protected)
router.get('/reviews', adminAuth, async (req, res) => {
  try {
    const roomReviews = await Review.find().populate('userId', 'username').populate('roomId', 'title');
    const transferReviews = await TransferReview.find().populate('userId', 'username').populate('transferId', 'transferType');
    const flightReviews = await FlightReview.find().populate('userId', 'username').populate('flightId', 'from to');
    
    res.json({ roomReviews, transferReviews, flightReviews });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
