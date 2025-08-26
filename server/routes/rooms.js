// server/routes/rooms.js
const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const auth = require('./middleware');

router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }
    res.json(room);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

router.post('/add', auth, async (req, res) => {
  const { title, description, price, image, roomType, beds, guests, amenities } = req.body;
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
    res.status(201).json({ message: 'Room added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;