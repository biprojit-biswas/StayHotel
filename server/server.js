// // server/server.js
// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const authRoutes = require('./routes/auth');
// const roomRoutes = require('./routes/rooms');
// const bookingRoutes = require('./routes/bookings');
// const reviewRoutes = require('./routes/reviews');
// const privateTransfersRoute = require('./routes/privateTransfers');
// const transferReviewsRoute = require('./routes/transferReviews');
// const bicycleRentalsRoute = require('./routes/bicycleRentals'); // Import new route
// const middleware = require('./routes/middleware');

// const flightBookingsRoute = require('./routes/flightBookings'); // Import new route
// // ...

// const flightBookingsRoute = require('./routes/flightBookings');
// const flightReviewsRoute = require('./routes/flightReviews'); // Import new route

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
// app.use('/api/bicycle-rentals', bicycleRentalsRoute); // Use the new route

// app.use('/api/flight-bookings', flightBookingsRoute); // Use the new route
// // ... (rest of the code)

// app.use('/api/flight-bookings', flightBookingsRoute);
// app.use('/api/flight-reviews', flightReviewsRoute); // Use the new route

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

// // server/server.js
// // ... (existing imports)
// const authRoutes = require('./routes/auth');
// const roomRoutes = require('./routes/rooms');
// const bookingRoutes = require('./routes/bookings');
// const reviewRoutes = require('./routes/reviews');
// const privateTransfersRoute = require('./routes/privateTransfers');
// const transferReviewsRoute = require('./routes/transferReviews');
// const adminRoutes = require('./routes/admin'); // Import new route
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
// app.use('/api/admin', adminRoutes); // Use the new route

// // ... (existing code)




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
const flightBookingsRoute = require('./routes/flightBookings'); // This is the correct line
const flightReviewsRoute = require('./routes/flightReviews'); // This is the correct line
const adminRoutes = require('./routes/admin');

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
app.use('/api/flight-bookings', flightBookingsRoute);
app.use('/api/flight-reviews', flightReviewsRoute);
app.use('/api/admin', adminRoutes);

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