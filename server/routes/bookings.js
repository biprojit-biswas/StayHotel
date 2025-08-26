// server/routes/bookings.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const auth = require('./middleware');
const Room = require('../models/Room');

// Create a new booking
router.post('/', auth, async (req, res) => {
  const { roomId, userName, userPhone, checkInDate, checkOutDate } = req.body;
  
  try {
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ msg: 'Room not found' });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const oneDay = 24 * 60 * 60 * 1000;
    const totalNights = Math.round(Math.abs((checkOut - checkIn) / oneDay));
    const totalPrice = totalNights * room.price;

    const newBooking = new Booking({
      userId: req.user,
      roomId,
      userName,
      userPhone,
      checkInDate,
      checkOutDate,
      totalPrice,
    });
    
    await newBooking.save();
    res.status(201).json({ msg: 'Booking successful!', totalPrice, booking: newBooking });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get user's bookings
router.get('/mybookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user }).populate('roomId', 'title price image');
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Cancel a booking
router.delete('/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user });
    
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found or not authorized' });
    }
    
    await Booking.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: 'Booking canceled successfully' });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;