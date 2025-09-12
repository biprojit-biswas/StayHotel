// // server/routes/rooms.js
// const express = require('express');
// const router = express.Router();
// const Room = require('../models/Room');
// const auth = require('./middleware');

// router.get('/', async (req, res) => {
//   try {
//     const rooms = await Room.find();
//     res.json(rooms);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.get('/:id', async (req, res) => {
//   try {
//     const room = await Room.findById(req.params.id);
//     if (!room) {
//       return res.status(404).json({ msg: 'Room not found' });
//     }
//     res.json(room);
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// router.post('/add', auth, async (req, res) => {
//   const { title, description, price, image, roomType, beds, guests, amenities } = req.body;
//   try {
//     const newRoom = new Room({
//       title,
//       description,
//       price,
//       image,
//       roomType,
//       beds,
//       guests,
//       amenities,
//     });
//     await newRoom.save();
//     res.status(201).json({ message: 'Room added successfully!' });
//   } catch (err) {
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// module.exports = router;

// server/routes/rooms.js
const express = require("express");
const router = express.Router();
const Room = require("../models/Room");

// Assuming you have these middleware files.
// The 'auth' middleware checks if the user is logged in.
// The 'admin' middleware should check if user.role === 'admin'.
const auth = require("../middleware/auth");
const admin = require("../middleware/admin"); // Corrected path for admin middleware

// GET all rooms (Public)
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// GET a single room by ID (Public)
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// POST - Add a new room (Private, Admin)
router.post("/add", [auth, admin], async (req, res) => {
  // Added 'admin' middleware for security
  const {
    title,
    description,
    price,
    image,
    roomType,
    beds,
    guests,
    amenities,
  } = req.body;
  try {
    const newRoom = new Room({
      title,
      description,
      price,
      image,
      roomType,
      beds,
      guests,
      amenities,
    });
    await newRoom.save();
    res.status(201).json({ message: "Room added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// START: NEW CODE BLOCK TO ADD
// -----------------------------------------------------

// @route   DELETE api/rooms/:id
// @desc    Delete a room
// @access  Private, Admin
router.delete("/:id", [auth, admin], async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    // Check if room exists
    if (!room) {
      return res.status(404).json({ msg: "Room not found" });
    }

    // In a real app, you would also check if the user has permission.
    // The admin middleware should handle this.

    await Room.findByIdAndDelete(req.params.id);

    res.json({ msg: "Room removed successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// -----------------------------------------------------
// END: NEW CODE BLOCK

module.exports = router;
