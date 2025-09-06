// // server/server.js
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// // server/server.js
// // ... (existing imports)
// const roomRoutes = require('./routes/rooms');
// const bookingRoutes = require('./routes/bookings');
// const reviewRoutes = require('./routes/reviews');
// const privateTransfersRoute = require('./routes/privateTransfers');
// const transferReviewsRoute = require('./routes/transferReviews');
// const bicycleRentalsRoute = require('./routes/bicycleRentals');
// const bicycleReviewsRoute = require('./routes/bicycleReviews'); // Import the new route
// const flightBookingsRoute = require('./routes/flightBookings');
// const flightReviewsRoute = require('./routes/flightReviews');
// const middleware = require('./routes/middleware');

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/rooms', roomRoutes);
// app.use('/api/bookings', bookingRoutes);
// app.use('/api/reviews', reviewRoutes);
// app.use('/api/private-transfers', privateTransfersRoute);
// app.use('/api/transfer-reviews', transferReviewsRoute);
// app.use('/api/bicycle-rentals', bicycleRentalsRoute);
// app.use('/api/bicycle-reviews', bicycleReviewsRoute); // Use the new route
// app.use('/api/flight-bookings', flightBookingsRoute);
// app.use('/api/flight-reviews', flightReviewsRoute);


// // MongoDB Connection
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log('MongoDB connected successfully'))
//   .catch(err => console.error('MongoDB connection error:', err));

// app.get('/', (req, res) => {
//   res.send('Server is running and connected to MongoDB!');
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });











// server/server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const bookingRoutes = require('./routes/bookings');
const reviewRoutes = require('./routes/reviews');
const privateTransfersRoute = require('./routes/privateTransfers');
const transferReviewsRoute = require('./routes/transferReviews');
const bicycleRentalsRoute = require('./routes/bicycleRentals');
const bicycleReviewsRoute = require('./routes/bicycleReviews');
const flightBookingsRoute = require('./routes/flightBookings');
const flightReviewsRoute = require('./routes/flightReviews');
const middleware = require('./routes/middleware');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/private-transfers', privateTransfersRoute);
app.use('/api/transfer-reviews', transferReviewsRoute);
app.use('/api/bicycle-rentals', bicycleRentalsRoute);
app.use('/api/bicycle-reviews', bicycleReviewsRoute);
app.use('/api/flight-bookings', flightBookingsRoute);
app.use('/api/flight-reviews', flightReviewsRoute);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Server is running and connected to MongoDB!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});