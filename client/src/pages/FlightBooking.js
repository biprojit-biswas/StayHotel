// // client/src/pages/FlightBooking.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const FlightBooking = () => {
//   const [formData, setFormData] = useState({
//     from: '',
//     to: '',
//     departureDate: '',
//     returnDate: '',
//     passengers: 1,
//     bookingClass: 'Economy',
//   });
//   const [isRoundTrip, setIsRoundTrip] = useState(true);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setMessage('You must be logged in to book a flight.');
//       return;
//     }
    
//     try {
//       const bookingData = { ...formData, passengers: Number(formData.passengers) };
//       await axios.post('http://localhost:5000/api/flight-bookings', bookingData, {
//         headers: { 'x-auth-token': token },
//       });
//       setMessage('Flight booking successful!');
//       setTimeout(() => navigate('/home'), 2000);
//     } catch (err) {
//       setMessage(err.response?.data.msg || 'Failed to book flight.');
//     }
//   };

//   return (
//     <div className="flight-booking-container">
//       <div className="flight-booking-card card">
//         <h2 className="text-center">Search & Book Flights</h2>
//         <div className="trip-type-options">
//           <button className={`trip-type-btn ${isRoundTrip ? 'active' : ''}`} onClick={() => setIsRoundTrip(true)}>Round Trip</button>
//           <button className={`trip-type-btn ${!isRoundTrip ? 'active' : ''}`} onClick={() => setIsRoundTrip(false)}>One Way</button>
//         </div>
//         <form onSubmit={handleBooking}>
//           <div className="form-group">
//             <label>From</label>
//             <input type="text" name="from" placeholder="City or Airport" value={formData.from} onChange={handleInputChange} required />
//           </div>
//           <div className="form-group">
//             <label>To</label>
//             <input type="text" name="to" placeholder="City or Airport" value={formData.to} onChange={handleInputChange} required />
//           </div>
//           <div className="form-group">
//             <label>Departure Date</label>
//             <input type="date" name="departureDate" value={formData.departureDate} onChange={handleInputChange} required />
//           </div>
//           {isRoundTrip && (
//             <div className="form-group">
//               <label>Return Date</label>
//               <input type="date" name="returnDate" value={formData.returnDate} onChange={handleInputChange} required />
//             </div>
//           )}
//           <div className="form-group">
//             <label>Passengers</label>
//             <input type="number" name="passengers" value={formData.passengers} onChange={handleInputChange} min="1" required />
//           </div>
//           <div className="form-group">
//             <label>Class</label>
//             <select name="bookingClass" value={formData.bookingClass} onChange={handleInputChange}>
//               <option>Economy</option>
//               <option>Business</option>
//               <option>First Class</option>
//             </select>
//           </div>
//           <button type="submit" className="btn btn-primary">Search Flights</button>
//         </form>
//         {message && <p className="text-center" style={{ marginTop: '20px' }}>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default FlightBooking;


// // client/src/pages/FlightBooking.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const FlightBooking = () => {
//   const [formData, setFormData] = useState({
//     from: '',
//     to: '',
//     departureDate: '',
//     returnDate: '',
//     passengers: 1,
//     bookingClass: 'Economy',
//   });
//   const [isRoundTrip, setIsRoundTrip] = useState(true);
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const flightPrices = {
//     Economy: 10000,
//     Business: 25000,
//     'First Class': 50000,
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const calculateTotalPrice = () => {
//     const pricePerPassenger = flightPrices[formData.bookingClass];
//     let calculatedPrice = pricePerPassenger * formData.passengers;
//     if (isRoundTrip) {
//       calculatedPrice *= 2;
//     }
//     setTotalPrice(calculatedPrice);
//   };

//   useEffect(() => {
//     calculateTotalPrice();
//   }, [formData, isRoundTrip]);

//   const handleBooking = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) {
//       setMessage('You must be logged in to book a flight.');
//       return;
//     }
    
//     try {
//       const bookingData = { ...formData, passengers: Number(formData.passengers), totalPrice: totalPrice };
//       await axios.post('http://localhost:5000/api/flight-bookings', bookingData, {
//         headers: { 'x-auth-token': token },
//       });
//       setMessage('Flight booking successful!');
//       setTimeout(() => navigate('/home'), 2000);
//     } catch (err) {
//       setMessage(err.response?.data.msg || 'Failed to book flight.');
//     }
//   };

//   return (
//     <div className="flight-booking-container">
//       <div className="flight-booking-card card">
//         <h2 className="text-center">Search & Book Flights</h2>
//         <div className="trip-type-options">
//           <button type="button" className={`trip-type-btn ${isRoundTrip ? 'active' : ''}`} onClick={() => setIsRoundTrip(true)}>Round Trip</button>
//           <button type="button" className={`trip-type-btn ${!isRoundTrip ? 'active' : ''}`} onClick={() => setIsRoundTrip(false)}>One Way</button>
//         </div>
//         <form onSubmit={handleBooking}>
//           <div className="form-group">
//             <label>From</label>
//             <input type="text" name="from" placeholder="City or Airport" value={formData.from} onChange={handleInputChange} required />
//           </div>
//           <div className="form-group">
//             <label>To</label>
//             <input type="text" name="to" placeholder="City or Airport" value={formData.to} onChange={handleInputChange} required />
//           </div>
//           <div className="form-group">
//             <label>Departure Date</label>
//             <input type="date" name="departureDate" value={formData.departureDate} onChange={handleInputChange} required />
//           </div>
//           {isRoundTrip && (
//             <div className="form-group">
//               <label>Return Date</label>
//               <input type="date" name="returnDate" value={formData.returnDate} onChange={handleInputChange} required />
//             </div>
//           )}
//           <div className="form-group">
//             <label>Passengers</label>
//             <input type="number" name="passengers" value={formData.passengers} onChange={handleInputChange} min="1" required />
//           </div>
//           <div className="form-group">
//             <label>Class</label>
//             <select name="bookingClass" value={formData.bookingClass} onChange={handleInputChange}>
//               <option>Economy</option>
//               <option>Business</option>
//               <option>First Class</option>
//             </select>
//           </div>
//           <div className="price-display">
//             <p><strong>Estimated Total:</strong> BDT {totalPrice}</p>
//           </div>
//           <button type="submit" className="btn btn-primary">Search Flights</button>
//         </form>
//         {message && <p className="text-center" style={{ marginTop: '20px' }}>{message}</p>}
//       </div>
//     </div>
//   );
// };

// export default FlightBooking;



// client/src/pages/FlightBooking.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const FlightBooking = () => {
  const [formData, setFormData] = useState({
    from: '',
    to: '',
    departureDate: '',
    returnDate: '',
    passengers: 1,
    bookingClass: 'Economy',
  });
  const [isRoundTrip, setIsRoundTrip] = useState(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const flightPrices = {
    Economy: 10000,
    Business: 25000,
    'First Class': 50000,
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateTotalPrice = () => {
    const pricePerPassenger = flightPrices[formData.bookingClass];
    let calculatedPrice = pricePerPassenger * formData.passengers;
    if (isRoundTrip) {
      calculatedPrice *= 2;
    }
    setTotalPrice(calculatedPrice);
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [formData, isRoundTrip]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to book a flight.');
      return;
    }
    
    try {
      const bookingData = { ...formData, passengers: Number(formData.passengers), totalPrice: totalPrice };
      await axios.post('http://localhost:5000/api/flight-bookings', bookingData, {
        headers: { 'x-auth-token': token },
      });
      setMessage('Flight booking successful!');
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      setMessage(err.response?.data.msg || 'Failed to book flight.');
    }
  };

  return (
    <div className="flight-booking-container">
      <div className="flight-booking-card card">
        <h2 className="text-center">Search & Book Flights</h2>
        <div className="trip-type-selector">
          <button type="button" className={`selector-btn ${isRoundTrip ? 'active' : ''}`} onClick={() => setIsRoundTrip(true)}>Round Trip</button>
          <button type="button" className={`selector-btn ${!isRoundTrip ? 'active' : ''}`} onClick={() => setIsRoundTrip(false)}>One Way</button>
        </div>
        <form onSubmit={handleBooking}>
          <div className="form-group">
            <label>From</label>
            <input type="text" name="from" placeholder="City or Airport" value={formData.from} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>To</label>
            <input type="text" name="to" placeholder="City or Airport" value={formData.to} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Departure Date</label>
            <input type="date" name="departureDate" value={formData.departureDate} onChange={handleInputChange} required />
          </div>
          {isRoundTrip && (
            <div className="form-group">
              <label>Return Date</label>
              <input type="date" name="returnDate" value={formData.returnDate} onChange={handleInputChange} required />
            </div>
          )}
          <div className="form-group">
            <label>Passengers</label>
            <input type="number" name="passengers" value={formData.passengers} onChange={handleInputChange} min="1" required />
          </div>
          <div className="form-group">
            <label>Class</label>
            <select name="bookingClass" value={formData.bookingClass} onChange={handleInputChange}>
              <option>Economy</option>
              <option>Business</option>
              <option>First Class</option>
            </select>
          </div>
          <div className="price-display">
            <p><strong>Estimated Total:</strong> BDT {totalPrice}</p>
          </div>
          <button type="submit" className="btn btn-primary">Search Flights</button>
        </form>
        {message && <p className="text-center" style={{ marginTop: '20px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default FlightBooking;