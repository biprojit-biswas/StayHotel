// // // // server/routes/bookings.js
// // // const express = require('express');
// // // const router = express.Router();
// // // const Booking = require('../models/Booking');
// // // const auth = require('./middleware');
// // // const Room = require('../models/Room');

// // // // Create a new booking
// // // router.post('/', auth, async (req, res) => {
// // //   const { roomId, userName, userPhone, checkInDate, checkOutDate } = req.body;
  
// // //   try {
// // //     const room = await Room.findById(roomId);
// // //     if (!room) {
// // //       return res.status(404).json({ msg: 'Room not found' });
// // //     }

// // //     const checkIn = new Date(checkInDate);
// // //     const checkOut = new Date(checkOutDate);

// // //     const oneDay = 24 * 60 * 60 * 1000;
// // //     const totalNights = Math.round(Math.abs((checkOut - checkIn) / oneDay));
// // //     const totalPrice = totalNights * room.price;

// // //     const newBooking = new Booking({
// // //       userId: req.user,
// // //       roomId,
// // //       userName,
// // //       userPhone,
// // //       checkInDate,
// // //       checkOutDate,
// // //       totalPrice,
// // //     });
    
// // //     await newBooking.save();
// // //     res.status(201).json({ msg: 'Booking successful!', totalPrice, booking: newBooking });
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // });

// // // // Get user's bookings
// // // router.get('/mybookings', auth, async (req, res) => {
// // //   try {
// // //     const bookings = await Booking.find({ userId: req.user }).populate('roomId', 'title price image');
// // //     res.json(bookings);
// // //   } catch (err) {
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // });

// // // // Cancel a booking
// // // router.delete('/:id', auth, async (req, res) => {
// // //   try {
// // //     const booking = await Booking.findOne({ _id: req.params.id, userId: req.user });
    
// // //     if (!booking) {
// // //       return res.status(404).json({ msg: 'Booking not found or not authorized' });
// // //     }
    
// // //     await Booking.deleteOne({ _id: req.params.id });
// // //     res.status(200).json({ msg: 'Booking canceled successfully' });
    
// // //   } catch (err) {
// // //     console.error(err);
// // //     res.status(500).json({ error: 'Server error' });
// // //   }
// // // });

// // // module.exports = router;

// // // server/routes/bookings.js
// // const express = require('express');
// // const router = express.Router();
// // const Booking = require('../models/Booking');
// // const auth = require('./middleware');
// // const Room = require('../models/Room');

// // // Create a new booking
// // router.post('/', auth, async (req, res) => {
// //   const { roomId, userName, userPhone, checkInDate, checkOutDate } = req.body;
  
// //   try {
// //     const room = await Room.findById(roomId);
// //     if (!room) {
// //       return res.status(404).json({ msg: 'Room not found' });
// //     }

// //     // New check to see if the room is already booked
// //     if (room.isBooked) {
// //       return res.status(400).json({ msg: 'This room is not available for booking.' });
// //     }

// //     const checkIn = new Date(checkInDate);
// //     const checkOut = new Date(checkOutDate);

// //     const oneDay = 24 * 60 * 60 * 1000;
// //     const totalNights = Math.round(Math.abs((checkOut - checkIn) / oneDay));
// //     const totalPrice = totalNights * room.price;

// //     const newBooking = new Booking({
// //       userId: req.user,
// //       roomId,
// //       userName,
// //       userPhone,
// //       checkInDate,
// //       checkOutDate,
// //       totalPrice,
// //     });
    
// //     await newBooking.save();

// //     // Mark the room as booked
// //     room.isBooked = true;
// //     await room.save();

// //     res.status(201).json({ msg: 'Booking successful!', totalPrice, booking: newBooking });
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // Check-in a room
// // router.put('/checkin/:id', auth, async (req, res) => {
// //   try {
// //     const booking = await Booking.findOne({ _id: req.params.id, userId: req.user });
// //     if (!booking) {
// //       return res.status(404).json({ msg: 'Booking not found or not authorized' });
// //     }

// //     // Update booking status
// //     booking.status = 'checked_in';
// //     await booking.save();
    
// //     res.status(200).json({ msg: 'Check-in successful!' });

// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // Cancel a booking
// // router.delete('/:id', auth, async (req, res) => {
// //   try {
// //     const booking = await Booking.findOne({ _id: req.params.id, userId: req.user });
    
// //     if (!booking) {
// //       return res.status(404).json({ msg: 'Booking not found or not authorized' });
// //     }
    
// //     await Booking.deleteOne({ _id: req.params.id });

// //     // Mark the room as available again
// //     const room = await Room.findById(booking.roomId);
// //     if (room) {
// //       room.isBooked = false;
// //       await room.save();
// //     }

// //     res.status(200).json({ msg: 'Booking canceled successfully' });
    
// //   } catch (err) {
// //     console.error(err);
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // // Get user's bookings
// // router.get('/mybookings', auth, async (req, res) => {
// //   try {
// //     const bookings = await Booking.find({ userId: req.user }).populate('roomId', 'title price image isBooked');
// //     res.json(bookings);
// //   } catch (err) {
// //     res.status(500).json({ error: 'Server error' });
// //   }
// // });

// // module.exports = router;















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

    // Check if the room is booked for the requested dates
    const existingBookings = await Booking.find({ 
      roomId: roomId,
      $or: [
        { status: 'booked' },
        { status: 'checked_in' }
      ]
    });

    if (existingBookings.length > 0) {
      return res.status(400).json({ msg: 'This room is not available for the requested dates.' });
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

// Check-in a room
router.put('/checkin/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user });
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found or not authorized' });
    }

    booking.status = 'checked_in';
    await booking.save();
    
    // Mark the room as currently booked for all users
    const room = await Room.findById(booking.roomId);
    if (room) {
        room.isBooked = true;
        await room.save();
    }
    
    res.status(200).json({ msg: 'Check-in successful!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Check-out a room
router.put('/checkout/:id', auth, async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, userId: req.user });
    if (!booking) {
      return res.status(404).json({ msg: 'Booking not found or not authorized' });
    }

    booking.status = 'checked_out';
    await booking.save();
    
    // Mark the room as available for other users
    const room = await Room.findById(booking.roomId);
    if (room) {
        room.isBooked = false;
        await room.save();
    }

    res.status(200).json({ msg: 'Check-out successful!' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});


// Get user's bookings
router.get('/mybookings', auth, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user }).populate('roomId', 'title price image isBooked');
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

    // Mark the room as available again
    const room = await Room.findById(booking.roomId);
    if (room) {
      room.isBooked = false;
      await room.save();
    }

    res.status(200).json({ msg: 'Booking canceled successfully' });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
