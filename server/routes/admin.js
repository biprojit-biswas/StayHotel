// // // server/routes/admin.js
// // const express = require('express');
// // const router = express.Router();
// // const User = require('../models/User');
// // const Review = require('../models/Review');
// // const TransferReview = require('../models/TransferReview');
// // const FlightReview = require('../models/FlightReview'); // Added FlightReview model
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');
// // const auth = require('./middleware');

// // // Hardcoded admin credentials for a simple implementation
// // const ADMIN_EMAIL = 'admin@stayhotel.com';
// // const ADMIN_PASSWORD = 'adminpassword';

// // // Middleware to check for admin privileges
// // const adminAuth = async (req, res, next) => {
// //   const token = req.header('x-auth-token');
// //   if (!token) {
// //     return res.status(401).json({ msg: 'No token, authorization denied' });
// //   }
// //   try {
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);
// //     // Find a user with this ID
// //     const user = await User.findById(decoded.id);
// //     // Check if the user's email matches the admin email
// //     if (!user || user.email !== ADMIN_EMAIL) {
// //       return res.status(403).json({ msg: 'Forbidden: You do not have admin access' });
// //     }
// //     req.user = decoded.id;
// //     next();
// //   } catch (e) {
// //     res.status(400).json({ msg: 'Token is not valid' });
// //   }
// // };

// // // Admin login route
// // router.post('/login', async (req, res) => {
// //   const { email, password } = req.body;
  
// //   if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
// //     return res.status(400).json({ msg: 'Invalid credentials' });
// //   }

// //   // Create a token for the admin. Note: using a placeholder ID as we're not
// //   // creating a real User entry for the admin. In a real app, you would.
// //   const token = jwt.sign({ id: 'admin_id_placeholder' }, process.env.JWT_SECRET, { expiresIn: '1h' });
// //   res.json({ token, msg: 'Admin login successful' });
// // });

// // // Get all reviews for the admin panel (protected)
// // router.get('/reviews', adminAuth, async (req, res) => {
// //   try {
// //     const roomReviews = await Review.find().populate('userId', 'username').populate('roomId', 'title');
// //     const transferReviews = await TransferReview.find().populate('userId', 'username').populate('transferId', 'transferType');
// //     const flightReviews = await FlightReview.find().populate('userId', 'username').populate('flightId', 'from to');
    
// //     res.json({ roomReviews, transferReviews, flightReviews });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // module.exports = router;




























// // server/routes/admin.js
// const express = require('express');
// const router = express.Router();
// const adminAuth = require('./adminMiddleware');
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');

// // Endpoint to add a new staff member
// router.post('/staff/add', adminAuth, async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newStaff = new User({ username, email, password: hashedPassword, isAdmin: false });
//     await newStaff.save();
//     res.status(201).json({ msg: 'New staff member added successfully!' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Endpoint to assign money to a client
// router.post('/client/assign-funds', adminAuth, async (req, res) => {
//   const { userId, amount } = req.body;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       return res.status(404).json({ msg: 'Client not found' });
//     }
//     // In a real application, you would add this amount to the user's balance
//     // For now, we'll just return a success message.
//     res.status(200).json({ msg: `Successfully assigned BDT ${amount} to ${user.username}.` });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/users', adminAuth, async (req, res) => {
//   try {
//     const users = await User.find({}, '-password');
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;











// server/routes/admin.js
const express = require('express');
const router = express.Router();
const adminAuth = require('./adminMiddleware');
const User = require('../models/User');
const Room = require('../models/Room');
const Review = require('../models/Review');
const TransferReview = require('../models/TransferReview');
const bcrypt = require('bcryptjs');

// Endpoint to add a new staff member
router.post('/staff/add', adminAuth, async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newStaff = new User({ username, email, password: hashedPassword, isAdmin: false });
    await newStaff.save();
    res.status(201).json({ msg: 'New staff member added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to get all users
router.get('/users', adminAuth, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Exclude password field
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Endpoint to assign money to a client
router.post('/client/assign-funds', adminAuth, async (req, res) => {
  const { userId, amount } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'Client not found' });
    }
    res.status(200).json({ msg: `Successfully assigned BDT ${amount} to ${user.username}.` });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// New endpoint to get all rooms
router.get('/rooms', adminAuth, async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// New endpoint to get all reviews
router.get('/reviews', adminAuth, async (req, res) => {
  try {
    const roomReviews = await Review.find().populate('userId', 'username').populate('roomId', 'title');
    const transferReviews = await TransferReview.find().populate('userId', 'username').populate('transferId');
    res.json({ roomReviews, transferReviews });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;