// // // server/models/Room.js
// // const mongoose = require('mongoose');

// // const roomSchema = new mongoose.Schema({
// //   title: { type: String, required: true },
// //   description: { type: String, required: true },
// //   price: { type: Number, required: true },
// //   image: { type: String, required: true },
// //   availability: { type: Boolean, default: true },
// //   roomType: { type: String, required: true },
// //   beds: { type: Number, required: true },
// //   guests: { type: Number, required: true },
// //   amenities: { type: [String] },
// // });

// // module.exports = mongoose.model('Room', roomSchema);



// // server/models/Room.js
// const mongoose = require('mongoose');

// const roomSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String, required: true },
//   availability: { type: Boolean, default: true },
//   isBooked: { type: Boolean, default: false }, // New field
//   roomType: { type: String, required: true },
//   beds: { type: Number, required: true },
//   guests: { type: Number, required: true },
//   amenities: { type: [String] },
// });

// module.exports = mongoose.model('Room', roomSchema);







// server/models/Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  isBooked: { type: Boolean, default: false }, // New field to track current booking status
  roomType: { type: String, required: true },
  beds: { type: Number, required: true },
  guests: { type: Number, required: true },
  amenities: { type: [String] },
});

module.exports = mongoose.model('Room', roomSchema);