// // // // // server/models/Booking.js
// // // // const mongoose = require('mongoose');

// // // // const bookingSchema = new mongoose.Schema({
// // // //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// // // //   roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
// // // //   userName: { type: String, required: true },
// // // //   userPhone: { type: String, required: true },
// // // //   checkInDate: { type: Date, required: true },
// // // //   checkOutDate: { type: Date, required: true },
// // // //   totalPrice: { type: Number, required: true },
// // // //   createdAt: { type: Date, default: Date.now },
// // // // });

// // // // module.exports = mongoose.model('Booking', bookingSchema);

// // // // server/models/Booking.js
// // // const mongoose = require('mongoose');

// // // const bookingSchema = new mongoose.Schema({
// // //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// // //   roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
// // //   userName: { type: String, required: true },
// // //   userPhone: { type: String, required: true },
// // //   checkInDate: { type: Date, required: true },
// // //   checkOutDate: { type: Date, required: true },
// // //   totalPrice: { type: Number, required: true },
// // //   status: { type: String, enum: ['booked', 'checked_in', 'checked_out'], default: 'booked' }, // New field
// // //   createdAt: { type: Date, default: Date.now },
// // // });

// // // module.exports = mongoose.model('Booking', bookingSchema);




// // // server/models/Booking.js
// // const mongoose = require('mongoose');

// // const bookingSchema = new mongoose.Schema({
// //   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
// //   roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
// //   userName: { type: String, required: true },
// //   userPhone: { type: String, required: true },
// //   checkInDate: { type: Date, required: true },
// //   checkOutDate: { type: Date, required: true },
// //   totalPrice: { type: Number, required: true },
// //   status: { type: String, enum: ['booked', 'checked_in', 'checked_out'], default: 'booked' }, // Updated status field
// //   createdAt: { type: Date, default: Date.now },
// // });

// // module.exports = mongoose.model('Booking', bookingSchema);





// server/models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
  userName: { type: String, required: true },
  userPhone: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  checkedIn: { type: Boolean, default: false }, // New field for check-in status
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Booking', bookingSchema);














// // server/models/Booking.js
// const mongoose = require('mongoose');

// const bookingSchema = new mongoose.Schema({
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   roomId: { type: mongoose.Schema.Types.ObjectId, ref: 'Room', required: true },
//   userName: { type: String, required: true },
//   userPhone: { type: String, required: true },
//   checkInDate: { type: Date, required: true },
//   checkOutDate: { type: Date, required: true },
//   totalPrice: { type: Number, required: true },
//   checkedIn: { type: Boolean, default: false },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model('Booking', bookingSchema);