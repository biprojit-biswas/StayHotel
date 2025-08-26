// // server/routes/auth.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// router.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully!' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, user: { id: user._id, username: user.username } });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;

// // server/routes/auth.js
// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');

// // Register a new user with a specified role
// router.post('/register', async (req, res) => {
//   const { username, email, password, role } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const newUser = new User({ username, email, password: hashedPassword, role });
//     await newUser.save();
//     res.status(201).json({ message: 'User registered successfully!' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// // Login user
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ error: 'Invalid credentials' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;

// server/routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new user with a specified role
router.post('/register', async (req, res) => {
  const { username, email, password, role } = req.body;
  try {
    // Check if an admin already exists if a new admin is being registered
    if (role === 'admin') {
      const existingAdmin = await User.findOne({ role: 'admin' });
      if (existingAdmin) {
        return res.status(400).json({ msg: 'An admin user already exists.' });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword, role });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, user: { id: user._id, username: user.username, role: user.role } });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;