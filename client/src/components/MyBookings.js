// // // // // // // client/src/components/MyBookings.js
// // // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // // import axios from 'axios';
// // // // // // import ReviewForm from './ReviewForm';
// // // // // // import TransferReviewForm from './TransferReviewForm';
// // // // // // import '../App.css';

// // // // // // const MyBookings = () => {
// // // // // //     const [bookings, setBookings] = useState([]);
// // // // // //     const [loading, setLoading] = useState(true);
// // // // // //     const [error, setError] = useState(null);
// // // // // //     const [roomReviews, setRoomReviews] = useState({});
// // // // // //     const [transferReviews, setTransferReviews] = useState({});
// // // // // //     const [showRoomReviewForm, setShowRoomReviewForm] = useState(null);
// // // // // //     const [showTransferReviewForm, setShowTransferReviewForm] = useState(null);
// // // // // //     const [isPopupVisible, setIsPopupVisible] = useState(false);
// // // // // //     const [popupMessage, setPopupMessage] = useState('');

// // // // // //     const showPopup = (message) => {
// // // // // //         setPopupMessage(message);
// // // // // //         setIsPopupVisible(true);
// // // // // //         setTimeout(() => {
// // // // // //             setIsPopupVisible(false);
// // // // // //         }, 3000);
// // // // // //     };

// // // // // //     const fetchRoomReviews = async (bookingsData) => {
// // // // // //         const allReviews = {};
// // // // // //         for (const booking of bookingsData) {
// // // // // //             if (booking.roomId) {
// // // // // //                 try {
// // // // // //                     const response = await axios.get(`http://localhost:5000/api/reviews/${booking.roomId._id}`);
// // // // // //                     allReviews[booking.roomId._id] = response.data;
// // // // // //                 } catch (err) {
// // // // // //                     console.error(`Failed to fetch reviews for room ${booking.roomId._id}:`, err);
// // // // // //                 }
// // // // // //             }
// // // // // //         }
// // // // // //         setRoomReviews(allReviews);
// // // // // //     };

// // // // // //     const fetchTransferReviews = async (transfersData) => {
// // // // // //         const allReviews = {};
// // // // // //         for (const transfer of transfersData) {
// // // // // //             try {
// // // // // //                 const response = await axios.get(`http://localhost:5000/api/transfer-reviews/${transfer._id}`);
// // // // // //                 allReviews[transfer._id] = response.data;
// // // // // //             } catch (err) {
// // // // // //                 console.error(`Failed to fetch reviews for transfer ${transfer._id}:`, err);
// // // // // //             }
// // // // // //         }
// // // // // //         setTransferReviews(allReviews);
// // // // // //     };

// // // // // //     // Correctly wrapping fetchMyBookings in useCallback
// // // // // //     const fetchMyBookings = useCallback(async () => {
// // // // // //         const token = localStorage.getItem('token');
// // // // // //         if (!token) {
// // // // // //             setError('You are not logged in.');
// // // // // //             setLoading(false);
// // // // // //             return;
// // // // // //         }

// // // // // //         try {
// // // // // //             const roomBookingsResponse = await axios.get('http://localhost:5000/api/bookings/mybookings', {
// // // // // //                 headers: { 'x-auth-token': token },
// // // // // //             });
// // // // // //             const transferBookingsResponse = await axios.get('http://localhost:5000/api/private-transfers/mytransfers', {
// // // // // //                 headers: { 'x-auth-token': token },
// // // // // //             });
// // // // // //             const bicycleRentalsResponse = await axios.get('http://localhost:5000/api/bicycle-rentals/myrentals', {
// // // // // //                 headers: { 'x-auth-token': token },
// // // // // //             });
// // // // // //             const flightBookingsResponse = await axios.get('http://localhost:5000/api/flight-bookings/myflights', {
// // // // // //                 headers: { 'x-auth-token': token },
// // // // // //             });
            
// // // // // //             const allBookings = [
// // // // // //                 ...roomBookingsResponse.data.map(b => ({ ...b, type: 'room' })),
// // // // // //                 ...transferBookingsResponse.data.map(b => ({ ...b, type: 'transfer' })),
// // // // // //                 ...bicycleRentalsResponse.data.map(b => ({ ...b, type: 'bicycle' })),
// // // // // //                 ...flightBookingsResponse.data.map(b => ({ ...b, type: 'flight' })),
// // // // // //             ];

// // // // // //             setBookings(allBookings);
// // // // // //             await fetchRoomReviews(roomBookingsResponse.data);
// // // // // //             await fetchTransferReviews(transferBookingsResponse.data);
// // // // // //         } catch (err) {
// // // // // //             setError('Failed to fetch bookings.');
// // // // // //             console.error('Error fetching bookings:', err);
// // // // // //         } finally {
// // // // // //             setLoading(false);
// // // // // //         }
// // // // // //     }, []); // Empty dependency array as fetchMyBookings doesn't depend on any other state

// // // // // //     useEffect(() => {
// // // // // //         fetchMyBookings();
// // // // // //     }, [fetchMyBookings]); // Correctly including fetchMyBookings as a dependency

// // // // // //     const onRoomReviewSubmitted = (roomId) => {
// // // // // //         fetchRoomReviews(bookings.filter(b => b.type === 'room'));
// // // // // //         setShowRoomReviewForm(null);
// // // // // //     };

// // // // // //     const onTransferReviewSubmitted = (transferId) => {
// // // // // //         fetchTransferReviews(bookings.filter(b => b.type === 'transfer'));
// // // // // //         setShowTransferReviewForm(null);
// // // // // //     };

// // // // // //     const handleCancelBooking = async (bookingId) => {
// // // // // //         const token = localStorage.getItem('token');
// // // // // //         if (!token) { showPopup('You must be logged in to cancel a booking.'); return; }
// // // // // //         try {
// // // // // //             await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, { headers: { 'x-auth-token': token } });
// // // // // //             showPopup('Room booking canceled successfully!');
// // // // // //             fetchMyBookings();
// // // // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel room booking.'); }
// // // // // //     };

// // // // // //     const handleCancelTransfer = async (transferId) => {
// // // // // //         const token = localStorage.getItem('token');
// // // // // //         if (!token) { showPopup('You must be logged in to cancel a transfer.'); return; }
// // // // // //         try {
// // // // // //             await axios.delete(`http://localhost:5000/api/private-transfers/${transferId}`, { headers: { 'x-auth-token': token } });
// // // // // //             showPopup('Transfer canceled successfully!');
// // // // // //             fetchMyBookings();
// // // // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel transfer.'); }
// // // // // //     };

// // // // // //     const handleCancelBicycleRental = async (rentalId) => {
// // // // // //         const token = localStorage.getItem('token');
// // // // // //         if (!token) { showPopup('You must be logged in to cancel a bicycle rental.'); return; }
// // // // // //         try {
// // // // // //             await axios.delete(`http://localhost:5000/api/bicycle-rentals/${rentalId}`, { headers: { 'x-auth-token': token } });
// // // // // //             showPopup('Bicycle rental canceled successfully!');
// // // // // //             fetchMyBookings();
// // // // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel bicycle rental.'); }
// // // // // //     };
    
// // // // // //     return (
// // // // // //         <div className="container my-bookings-container">
// // // // // //             <h2 className="my-bookings-title">My Bookings</h2>
            
// // // // // //             {loading ? ( // Correctly using the loading state
// // // // // //                 <div className="text-center loading-message">Loading your bookings...</div>
// // // // // //             ) : error ? ( // Correctly using the error state
// // // // // //                 <div className="text-center error-message">{error}</div>
// // // // // //             ) : bookings.length > 0 ? (
// // // // // //                 <div className="bookings-list">
// // // // // //                     {bookings.map(item => (
// // // // // //                         <div key={item._id} className="booking-item-card card">
// // // // // //                             <div className="item-image-container">
// // // // // //                                 {item.type === 'room' ? (
// // // // // //                                     <img src={item.roomId?.image} alt={item.roomId?.title} className="item-image" />
// // // // // //                                 ) : item.type === 'transfer' ? (
// // // // // //                                     <div className="transport-icon-container">
// // // // // //                                         <i className="fas fa-car-side"></i>
// // // // // //                                     </div>
// // // // // //                                 ) : item.type === 'bicycle' ? (
// // // // // //                                     <div className="transport-icon-container">
// // // // // //                                         <i className="fas fa-bicycle"></i>
// // // // // //                                     </div>
// // // // // //                                 ) : (
// // // // // //                                     <div className="transport-icon-container">
// // // // // //                                         <i className="fas fa-plane"></i>
// // // // // //                                     </div>
// // // // // //                                 )}
// // // // // //                             </div>
// // // // // //                             <div className="item-details">
// // // // // //                                 {item.type === 'room' ? (
// // // // // //                                     <>
// // // // // //                                         <h4 className="item-title">{item.roomId?.title}</h4>
// // // // // //                                         <p><strong>Type:</strong> Room Booking</p>
// // // // // //                                         <p><strong>Check-in:</strong> {new Date(item.checkInDate).toLocaleDateString()}</p>
// // // // // //                                         <p><strong>Check-out:</strong> {new Date(item.checkOutDate).toLocaleDateString()}</p>
// // // // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // // // //                                         <div className="item-actions">
// // // // // //                                             <button className="btn-review" onClick={() => setShowRoomReviewForm(item.roomId?._id)}>
// // // // // //                                                 Write Review
// // // // // //                                             </button>
// // // // // //                                             <button className="btn-cancel" onClick={() => handleCancelBooking(item._id)}>
// // // // // //                                                 Cancel Room
// // // // // //                                             </button>
// // // // // //                                         </div>
// // // // // //                                     </>
// // // // // //                                 ) : item.type === 'transfer' ? (
// // // // // //                                     <>
// // // // // //                                         <h4 className="item-title">Private Transfer</h4>
// // // // // //                                         <p><strong>Type:</strong> {item.transferType}</p>
// // // // // //                                         <p><strong>Arrival Date:</strong> {new Date(item.arrivalDate).toLocaleDateString()}</p>
// // // // // //                                         <p><strong>Arrival Time:</strong> {item.arrivalTime}</p>
// // // // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // // // //                                         <div className="item-actions">
// // // // // //                                             <button className="btn-review" onClick={() => setShowTransferReviewForm(item._id)}>
// // // // // //                                                 Write Review
// // // // // //                                             </button>
// // // // // //                                             <button className="btn-cancel" onClick={() => handleCancelTransfer(item._id)}>
// // // // // //                                                 Cancel Transfer
// // // // // //                                             </button>
// // // // // //                                         </div>
// // // // // //                                     </>
// // // // // //                                 ) : item.type === 'bicycle' ? (
// // // // // //                                     <>
// // // // // //                                         <h4 className="item-title">Bicycle Rental</h4>
// // // // // //                                         <p><strong>Type:</strong> {item.bicycleType}</p>
// // // // // //                                         <p><strong>Rental Date:</strong> {new Date(item.rentalDate).toLocaleDateString()}</p>
// // // // // //                                         <p><strong>Duration:</strong> {item.rentalDuration} hours</p>
// // // // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // // // //                                         <div className="item-actions">
// // // // // //                                             <button className="btn-cancel" onClick={() => handleCancelBicycleRental(item._id)}>
// // // // // //                                                 Cancel Rental
// // // // // //                                             </button>
// // // // // //                                         </div>
// // // // // //                                     </>
// // // // // //                                 ) : (
// // // // // //                                     <>
// // // // // //                                         <h4 className="item-title">Flight Booking</h4>
// // // // // //                                         <p><strong>From:</strong> {item.from} to {item.to}</p>
// // // // // //                                         <p><strong>Depart:</strong> {new Date(item.departureDate).toLocaleDateString()}</p>
// // // // // //                                         {item.returnDate && <p><strong>Return:</strong> {new Date(item.returnDate).toLocaleDateString()}</p>}
// // // // // //                                         <p><strong>Passengers:</strong> {item.passengers}</p>
// // // // // //                                         <p><strong>Class:</strong> {item.class}</p>
// // // // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // // // //                                     </>
// // // // // //                                 )}
// // // // // //                             </div>

// // // // // //                             {/* ... (reviews section remains the same) */}
// // // // // //                         </div>
// // // // // //                     ))}
// // // // // //                 </div>
// // // // // //             ) : (
// // // // // //                 <div className="no-bookings-found">
// // // // // //                     <p>You have no bookings yet. Go explore our options!</p>
// // // // // //                 </div>
// // // // // //             )}
            
// // // // // //             {isPopupVisible && (
// // // // // //                 <div className="popup-container">
// // // // // //                     <div className="popup-message">{popupMessage}</div>
// // // // // //                 </div>
// // // // // //             )}
// // // // // //         </div>
// // // // // //     );
// // // // // // };

// // // // // // export default MyBookings;



// // // // //------------------------------------------------------


// // // // // // client/src/components/MyBookings.js
// // // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // // import axios from 'axios';
// // // // // import ReviewForm from './ReviewForm';
// // // // // import TransferReviewForm from './TransferReviewForm';
// // // // // import FlightReviewForm from './FlightReviewForm';
// // // // // import BicycleReviewForm from './BicycleReviewForm'; // Import the new component
// // // // // import '../App.css';

// // // // // const MyBookings = () => {
// // // // //     const [bookings, setBookings] = useState([]);
// // // // //     const [loading, setLoading] = useState(true);
// // // // //     const [error, setError] = useState(null);
// // // // //     const [roomReviews, setRoomReviews] = useState({});
// // // // //     const [transferReviews, setTransferReviews] = useState({});
// // // // //     const [flightReviews, setFlightReviews] = useState({});
// // // // //     const [bicycleReviews, setBicycleReviews] = useState({}); // New state
// // // // //     const [showRoomReviewForm, setShowRoomReviewForm] = useState(null);
// // // // //     const [showTransferReviewForm, setShowTransferReviewForm] = useState(null);
// // // // //     const [showFlightReviewForm, setShowFlightReviewForm] = useState(null);
// // // // //     const [showBicycleReviewForm, setShowBicycleReviewForm] = useState(null); // New state
// // // // //     const [isPopupVisible, setIsPopupVisible] = useState(false);
// // // // //     const [popupMessage, setPopupMessage] = useState('');

// // // // //     const showPopup = (message) => {
// // // // //         setPopupMessage(message);
// // // // //         setIsPopupVisible(true);
// // // // //         setTimeout(() => {
// // // // //             setIsPopupVisible(false);
// // // // //         }, 3000);
// // // // //     };

// // // // //     const fetchRoomReviews = async (bookingsData) => {
// // // // //         const allReviews = {};
// // // // //         for (const booking of bookingsData) {
// // // // //             if (booking.roomId) {
// // // // //                 try {
// // // // //                     const response = await axios.get(`http://localhost:5000/api/reviews/${booking.roomId._id}`);
// // // // //                     allReviews[booking.roomId._id] = response.data;
// // // // //                 } catch (err) {
// // // // //                     console.error(`Failed to fetch reviews for room ${booking.roomId._id}:`, err);
// // // // //                 }
// // // // //             }
// // // // //         }
// // // // //         setRoomReviews(allReviews);
// // // // //     };

// // // // //     const fetchTransferReviews = async (transfersData) => {
// // // // //         const allReviews = {};
// // // // //         for (const transfer of transfersData) {
// // // // //             try {
// // // // //                 const response = await axios.get(`http://localhost:5000/api/transfer-reviews/${transfer._id}`);
// // // // //                 allReviews[transfer._id] = response.data;
// // // // //             } catch (err) {
// // // // //                 console.error(`Failed to fetch reviews for transfer ${transfer._id}:`, err);
// // // // //             }
// // // // //         }
// // // // //         setTransferReviews(allReviews);
// // // // //     };

// // // // //     const fetchFlightReviews = async (flightsData) => {
// // // // //         const allReviews = {};
// // // // //         for (const flight of flightsData) {
// // // // //             try {
// // // // //                 const response = await axios.get(`http://localhost:5000/api/flight-reviews/${flight._id}`);
// // // // //                 allReviews[flight._id] = response.data;
// // // // //             } catch (err) {
// // // // //                 console.error(`Failed to fetch reviews for flight ${flight._id}:`, err);
// // // // //             }
// // // // //         }
// // // // //         setFlightReviews(allReviews);
// // // // //     };

// // // // //     const fetchBicycleReviews = async (rentalsData) => { // New function
// // // // //         const allReviews = {};
// // // // //         for (const rental of rentalsData) {
// // // // //             try {
// // // // //                 const response = await axios.get(`http://localhost:5000/api/bicycle-reviews/${rental._id}`);
// // // // //                 allReviews[rental._id] = response.data;
// // // // //             } catch (err) {
// // // // //                 console.error(`Failed to fetch reviews for bicycle rental ${rental._id}:`, err);
// // // // //             }
// // // // //         }
// // // // //         setBicycleReviews(allReviews);
// // // // //     };

// // // // //     const fetchMyBookings = useCallback(async () => {
// // // // //         const token = localStorage.getItem('token');
// // // // //         if (!token) {
// // // // //             setError('You are not logged in.');
// // // // //             setLoading(false);
// // // // //             return;
// // // // //         }

// // // // //         try {
// // // // //             const roomBookingsResponse = await axios.get('http://localhost:5000/api/bookings/mybookings', {
// // // // //                 headers: { 'x-auth-token': token },
// // // // //             });
// // // // //             const transferBookingsResponse = await axios.get('http://localhost:5000/api/private-transfers/mytransfers', {
// // // // //                 headers: { 'x-auth-token': token },
// // // // //             });
// // // // //             const bicycleRentalsResponse = await axios.get('http://localhost:5000/api/bicycle-rentals/myrentals', {
// // // // //                 headers: { 'x-auth-token': token },
// // // // //             });
// // // // //             const flightBookingsResponse = await axios.get('http://localhost:5000/api/flight-bookings/myflights', {
// // // // //                 headers: { 'x-auth-token': token },
// // // // //             });
            
// // // // //             const allBookings = [
// // // // //                 ...roomBookingsResponse.data.map(b => ({ ...b, type: 'room' })),
// // // // //                 ...transferBookingsResponse.data.map(b => ({ ...b, type: 'transfer' })),
// // // // //                 ...bicycleRentalsResponse.data.map(b => ({ ...b, type: 'bicycle' })),
// // // // //                 ...flightBookingsResponse.data.map(b => ({ ...b, type: 'flight' })),
// // // // //             ];

// // // // //             setBookings(allBookings);
// // // // //             await fetchRoomReviews(roomBookingsResponse.data);
// // // // //             await fetchTransferReviews(transferBookingsResponse.data);
// // // // //             await fetchFlightReviews(flightBookingsResponse.data);
// // // // //             await fetchBicycleReviews(bicycleRentalsResponse.data); // Fetch bicycle reviews
// // // // //         } catch (err) {
// // // // //             setError('Failed to fetch bookings.');
// // // // //             console.error('Error fetching bookings:', err);
// // // // //         } finally {
// // // // //             setLoading(false);
// // // // //         }
// // // // //     }, []);

// // // // //     useEffect(() => {
// // // // //         fetchMyBookings();
// // // // //     }, [fetchMyBookings]);

// // // // //     const onRoomReviewSubmitted = (roomId) => {
// // // // //         fetchRoomReviews(bookings.filter(b => b.type === 'room'));
// // // // //         setShowRoomReviewForm(null);
// // // // //     };

// // // // //     const onTransferReviewSubmitted = (transferId) => {
// // // // //         fetchTransferReviews(bookings.filter(b => b.type === 'transfer'));
// // // // //         setShowTransferReviewForm(null);
// // // // //     };

// // // // //     const onFlightReviewSubmitted = (flightId) => {
// // // // //         fetchFlightReviews(bookings.filter(b => b.type === 'flight'));
// // // // //         setShowFlightReviewForm(null);
// // // // //     };

// // // // //     const onBicycleReviewSubmitted = (rentalId) => { // New function
// // // // //         fetchBicycleReviews(bookings.filter(b => b.type === 'bicycle'));
// // // // //         setShowBicycleReviewForm(null);
// // // // //     };

// // // // //     const handleCancelBooking = async (bookingId) => {
// // // // //         const token = localStorage.getItem('token');
// // // // //         if (!token) { showPopup('You must be logged in to cancel a booking.'); return; }
// // // // //         try {
// // // // //             await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, { headers: { 'x-auth-token': token } });
// // // // //             showPopup('Room booking canceled successfully!');
// // // // //             fetchMyBookings();
// // // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel room booking.'); }
// // // // //     };

// // // // //     const handleCancelTransfer = async (transferId) => {
// // // // //         const token = localStorage.getItem('token');
// // // // //         if (!token) { showPopup('You must be logged in to cancel a transfer.'); return; }
// // // // //         try {
// // // // //             await axios.delete(`http://localhost:5000/api/private-transfers/${transferId}`, { headers: { 'x-auth-token': token } });
// // // // //             showPopup('Transfer canceled successfully!');
// // // // //             fetchMyBookings();
// // // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel transfer.'); }
// // // // //     };

// // // // //     const handleCancelBicycleRental = async (rentalId) => {
// // // // //         const token = localStorage.getItem('token');
// // // // //         if (!token) { showPopup('You must be logged in to cancel a bicycle rental.'); return; }
// // // // //         try {
// // // // //             await axios.delete(`http://localhost:5000/api/bicycle-rentals/${rentalId}`, { headers: { 'x-auth-token': token } });
// // // // //             showPopup('Bicycle rental canceled successfully!');
// // // // //             fetchMyBookings();
// // // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel bicycle rental.'); }
// // // // //     };
    
// // // // //     const handleCancelFlight = async (flightId) => {
// // // // //         const token = localStorage.getItem('token');
// // // // //         if (!token) { showPopup('You must be logged in to cancel a flight.'); return; }
// // // // //         try {
// // // // //             await axios.delete(`http://localhost:5000/api/flight-bookings/${flightId}`, { headers: { 'x-auth-token': token } });
// // // // //             showPopup('Flight canceled successfully!');
// // // // //             fetchMyBookings();
// // // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel flight.'); }
// // // // //     };

// // // // //     return (
// // // // //         <div className="container my-bookings-container">
// // // // //             <h2 className="my-bookings-title">My Bookings</h2>
            
// // // // //             {loading ? (
// // // // //                 <div className="text-center loading-message">Loading your bookings...</div>
// // // // //             ) : error ? (
// // // // //                 <div className="text-center error-message">{error}</div>
// // // // //             ) : bookings.length > 0 ? (
// // // // //                 <div className="bookings-list">
// // // // //                     {bookings.map(item => (
// // // // //                         <div key={item._id} className="booking-item-card card">
// // // // //                             <div className="item-image-container">
// // // // //                                 {item.type === 'room' ? (
// // // // //                                     <img src={item.roomId?.image} alt={item.roomId?.title} className="item-image" />
// // // // //                                 ) : item.type === 'transfer' ? (
// // // // //                                     <div className="transport-icon-container">
// // // // //                                         <i className="fas fa-car-side"></i>
// // // // //                                     </div>
// // // // //                                 ) : item.type === 'bicycle' ? (
// // // // //                                     <div className="transport-icon-container">
// // // // //                                         <i className="fas fa-bicycle"></i>
// // // // //                                     </div>
// // // // //                                 ) : (
// // // // //                                     <div className="transport-icon-container">
// // // // //                                         <i className="fas fa-plane"></i>
// // // // //                                     </div>
// // // // //                                 )}
// // // // //                             </div>
// // // // //                             <div className="item-details">
// // // // //                                 {item.type === 'room' ? (
// // // // //                                     <>
// // // // //                                         <h4 className="item-title">{item.roomId?.title}</h4>
// // // // //                                         <p><strong>Type:</strong> Room Booking</p>
// // // // //                                         <p><strong>Check-in:</strong> {new Date(item.checkInDate).toLocaleDateString()}</p>
// // // // //                                         <p><strong>Check-out:</strong> {new Date(item.checkOutDate).toLocaleDateString()}</p>
// // // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // // //                                         <div className="item-actions">
// // // // //                                             <button className="btn-review" onClick={() => setShowRoomReviewForm(item.roomId?._id)}>
// // // // //                                                 Write Review
// // // // //                                             </button>
// // // // //                                             <button className="btn-cancel" onClick={() => handleCancelBooking(item._id)}>
// // // // //                                                 Cancel Room
// // // // //                                             </button>
// // // // //                                         </div>
// // // // //                                     </>
// // // // //                                 ) : item.type === 'transfer' ? (
// // // // //                                     <>
// // // // //                                         <h4 className="item-title">Private Transfer</h4>
// // // // //                                         <p><strong>Type:</strong> {item.transferType}</p>
// // // // //                                         <p><strong>Arrival Date:</strong> {new Date(item.arrivalDate).toLocaleDateString()}</p>
// // // // //                                         <p><strong>Arrival Time:</strong> {item.arrivalTime}</p>
// // // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // // //                                         <div className="item-actions">
// // // // //                                             <button className="btn-review" onClick={() => setShowTransferReviewForm(item._id)}>
// // // // //                                                 Write Review
// // // // //                                             </button>
// // // // //                                             <button className="btn-cancel" onClick={() => handleCancelTransfer(item._id)}>
// // // // //                                                 Cancel Transfer
// // // // //                                             </button>
// // // // //                                         </div>
// // // // //                                     </>
// // // // //                                 ) : item.type === 'bicycle' ? (
// // // // //                                     <>
// // // // //                                         <h4 className="item-title">Bicycle Rental</h4>
// // // // //                                         <p><strong>Type:</strong> {item.bicycleType}</p>
// // // // //                                         <p><strong>Rental Date:</strong> {new Date(item.rentalDate).toLocaleDateString()}</p>
// // // // //                                         <p><strong>Duration:</strong> {item.rentalDuration} hours</p>
// // // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // // //                                         <div className="item-actions">
// // // // //                                             <button className="btn-review" onClick={() => setShowBicycleReviewForm(item._id)}>
// // // // //                                                 Write Review
// // // // //                                             </button>
// // // // //                                             <button className="btn-cancel" onClick={() => handleCancelBicycleRental(item._id)}>
// // // // //                                                 Cancel Rental
// // // // //                                             </button>
// // // // //                                         </div>
// // // // //                                     </>
// // // // //                                 ) : (
// // // // //                                     <>
// // // // //                                         <h4 className="item-title">Flight Booking</h4>
// // // // //                                         <p><strong>From:</strong> {item.from} to {item.to}</p>
// // // // //                                         <p><strong>Depart:</strong> {new Date(item.departureDate).toLocaleDateString()}</p>
// // // // //                                         {item.returnDate && <p><strong>Return:</strong> {new Date(item.returnDate).toLocaleDateString()}</p>}
// // // // //                                         <p><strong>Passengers:</strong> {item.passengers}</p>
// // // // //                                         <p><strong>Class:</strong> {item.class}</p>
// // // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // // //                                         <div className="item-actions">
// // // // //                                             <button className="btn-review" onClick={() => setShowFlightReviewForm(item._id)}>
// // // // //                                                 Write Review
// // // // //                                             </button>
// // // // //                                             <button className="btn-cancel" onClick={() => handleCancelFlight(item._id)}>
// // // // //                                                 Cancel Flight
// // // // //                                             </button>
// // // // //                                         </div>
// // // // //                                     </>
// // // // //                                 )}
// // // // //                             </div>

// // // // //                             {item.type === 'room' && showRoomReviewForm === item.roomId?._id && (
// // // // //                                 <div className="review-section-in-card">
// // // // //                                     <ReviewForm roomId={item.roomId?._id} onReviewSubmitted={() => onRoomReviewSubmitted(item.roomId?._id)} />
// // // // //                                     {roomReviews[item.roomId?._id] && roomReviews[item.roomId._id].length > 0 && (
// // // // //                                         <div className="reviews-list-in-card">
// // // // //                                             <h5>Your Review:</h5>
// // // // //                                             {roomReviews[item.roomId._id].map(review => (
// // // // //                                                 <div key={review._id} className="review-item">
// // // // //                                                     <p><strong>{review.userId.username}</strong> rated it {review.rating}/5</p>
// // // // //                                                     <p>"{review.comment}"</p>
// // // // //                                                 </div>
// // // // //                                             ))}
// // // // //                                         </div>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             )}

// // // // //                             {item.type === 'transfer' && showTransferReviewForm === item._id && (
// // // // //                                 <div className="review-section-in-card">
// // // // //                                     <TransferReviewForm transferId={item._id} onReviewSubmitted={() => onTransferReviewSubmitted(item._id)} />
// // // // //                                     {transferReviews[item._id] && transferReviews[item._id].length > 0 && (
// // // // //                                         <div className="reviews-list-in-card">
// // // // //                                             <h5>Your Review:</h5>
// // // // //                                             {transferReviews[item._id].map(review => (
// // // // //                                                 <div key={review._id} className="review-item">
// // // // //                                                     <p><strong>{review.userId.username}</strong> rated it {review.rating}/5</p>
// // // // //                                                     <p>"{review.comment}"</p>
// // // // //                                                 </div>
// // // // //                                             ))}
// // // // //                                         </div>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             )}

// // // // //                             {item.type === 'bicycle' && showBicycleReviewForm === item._id && (
// // // // //                                 <div className="review-section-in-card">
// // // // //                                     <BicycleReviewForm rentalId={item._id} onReviewSubmitted={() => onBicycleReviewSubmitted(item._id)} />
// // // // //                                     {bicycleReviews[item._id] && bicycleReviews[item._id].length > 0 && (
// // // // //                                         <div className="reviews-list-in-card">
// // // // //                                             <h5>Your Review:</h5>
// // // // //                                             {bicycleReviews[item._id].map(review => (
// // // // //                                                 <div key={review._id} className="review-item">
// // // // //                                                     <p><strong>{review.userId.username}</strong> rated it {review.rating}/5</p>
// // // // //                                                     <p>"{review.comment}"</p>
// // // // //                                                 </div>
// // // // //                                             ))}
// // // // //                                         </div>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             )}

// // // // //                             {item.type === 'flight' && showFlightReviewForm === item._id && (
// // // // //                                 <div className="review-section-in-card">
// // // // //                                     <FlightReviewForm flightId={item._id} onReviewSubmitted={() => onFlightReviewSubmitted(item._id)} />
// // // // //                                     {flightReviews[item._id] && flightReviews[item._id].length > 0 && (
// // // // //                                         <div className="reviews-list-in-card">
// // // // //                                             <h5>Your Review:</h5>
// // // // //                                             {flightReviews[item._id].map(review => (
// // // // //                                                 <div key={review._id} className="review-item">
// // // // //                                                     <p><strong>{review.userId.username}</strong> rated it {review.rating}/5</p>
// // // // //                                                     <p>"{review.comment}"</p>
// // // // //                                                 </div>
// // // // //                                             ))}
// // // // //                                         </div>
// // // // //                                     )}
// // // // //                                 </div>
// // // // //                             )}
// // // // //                         </div>
// // // // //                     ))}
// // // // //                 </div>
// // // // //             ) : (
// // // // //                 <div className="no-bookings-found">
// // // // //                     <p>You have no bookings yet. Go explore our options!</p>
// // // // //                 </div>
// // // // //             )}
            
// // // // //             {isPopupVisible && (
// // // // //                 <div className="popup-container">
// // // // //                     <div className="popup-message">{popupMessage}</div>
// // // // //                 </div>
// // // // //             )}
// // // // //         </div>
// // // // //     );
// // // // // };

// // // // // export default MyBookings;







// // // // // client/src/components/MyBookings.js
// // // // import React, { useState, useEffect, useCallback } from 'react';
// // // // import axios from 'axios';
// // // // import ReviewForm from './ReviewForm';
// // // // import TransferReviewForm from './TransferReviewForm';
// // // // import FlightReviewForm from './FlightReviewForm';
// // // // import BicycleReviewForm from './BicycleReviewForm';
// // // // import '../App.css';

// // // // const MyBookings = () => {
// // // //     const [bookings, setBookings] = useState([]);
// // // //     const [loading, setLoading] = useState(true);
// // // //     const [error, setError] = useState(null);
// // // //     const [roomReviews, setRoomReviews] = useState({});
// // // //     const [transferReviews, setTransferReviews] = useState({});
// // // //     const [flightReviews, setFlightReviews] = useState({});
// // // //     const [bicycleReviews, setBicycleReviews] = useState({});
// // // //     const [showRoomReviewForm, setShowRoomReviewForm] = useState(null);
// // // //     const [showTransferReviewForm, setShowTransferReviewForm] = useState(null);
// // // //     const [showFlightReviewForm, setShowFlightReviewForm] = useState(null);
// // // //     const [showBicycleReviewForm, setShowBicycleReviewForm] = useState(null);
// // // //     const [isPopupVisible, setIsPopupVisible] = useState(false);
// // // //     const [popupMessage, setPopupMessage] = useState('');

// // // //     const showPopup = (message) => {
// // // //         setPopupMessage(message);
// // // //         setIsPopupVisible(true);
// // // //         setTimeout(() => {
// // // //             setIsPopupVisible(false);
// // // //         }, 3000);
// // // //     };

// // // //     const fetchRoomReviews = async (bookingsData) => {
// // // //         const allReviews = {};
// // // //         for (const booking of bookingsData) {
// // // //             if (booking.roomId) {
// // // //                 try {
// // // //                     const response = await axios.get(`http://localhost:5000/api/reviews/${booking.roomId._id}`);
// // // //                     allReviews[booking.roomId._id] = response.data;
// // // //                 } catch (err) {
// // // //                     console.error(`Failed to fetch reviews for room ${booking.roomId._id}:`, err);
// // // //                 }
// // // //             }
// // // //         }
// // // //         setRoomReviews(allReviews);
// // // //     };

// // // //     const fetchTransferReviews = async (transfersData) => {
// // // //         const allReviews = {};
// // // //         for (const transfer of transfersData) {
// // // //             try {
// // // //                 const response = await axios.get(`http://localhost:5000/api/transfer-reviews/${transfer._id}`);
// // // //                 allReviews[transfer._id] = response.data;
// // // //             } catch (err) {
// // // //                 console.error(`Failed to fetch reviews for transfer ${transfer._id}:`, err);
// // // //             }
// // // //         }
// // // //         setTransferReviews(allReviews);
// // // //     };

// // // //     const fetchFlightReviews = async (flightsData) => {
// // // //         const allReviews = {};
// // // //         for (const flight of flightsData) {
// // // //             try {
// // // //                 const response = await axios.get(`http://localhost:5000/api/flight-reviews/${flight._id}`);
// // // //                 allReviews[flight._id] = response.data;
// // // //             } catch (err) {
// // // //                 console.error(`Failed to fetch reviews for flight ${flight._id}:`, err);
// // // //             }
// // // //         }
// // // //         setFlightReviews(allReviews);
// // // //     };

// // // //     const fetchBicycleReviews = async (rentalsData) => {
// // // //         const allReviews = {};
// // // //         for (const rental of rentalsData) {
// // // //             try {
// // // //                 const response = await axios.get(`http://localhost:5000/api/bicycle-reviews/${rental._id}`);
// // // //                 allReviews[rental._id] = response.data;
// // // //             } catch (err) {
// // // //                 console.error(`Failed to fetch reviews for bicycle rental ${rental._id}:`, err);
// // // //             }
// // // //         }
// // // //         setBicycleReviews(allReviews);
// // // //     };

// // // //     const fetchMyBookings = useCallback(async () => {
// // // //         const token = localStorage.getItem('token');
// // // //         if (!token) {
// // // //             setError('You are not logged in.');
// // // //             setLoading(false);
// // // //             return;
// // // //         }

// // // //         try {
// // // //             const roomBookingsResponse = await axios.get('http://localhost:5000/api/bookings/mybookings', {
// // // //                 headers: { 'x-auth-token': token },
// // // //             });
// // // //             const transferBookingsResponse = await axios.get('http://localhost:5000/api/private-transfers/mytransfers', {
// // // //                 headers: { 'x-auth-token': token },
// // // //             });
// // // //             const bicycleRentalsResponse = await axios.get('http://localhost:5000/api/bicycle-rentals/myrentals', {
// // // //                 headers: { 'x-auth-token': token },
// // // //             });
// // // //             const flightBookingsResponse = await axios.get('http://localhost:5000/api/flight-bookings/myflights', {
// // // //                 headers: { 'x-auth-token': token },
// // // //             });
            
// // // //             const allBookings = [
// // // //                 ...roomBookingsResponse.data.map(b => ({ ...b, type: 'room' })),
// // // //                 ...transferBookingsResponse.data.map(b => ({ ...b, type: 'transfer' })),
// // // //                 ...bicycleRentalsResponse.data.map(b => ({ ...b, type: 'bicycle' })),
// // // //                 ...flightBookingsResponse.data.map(b => ({ ...b, type: 'flight' })),
// // // //             ];

// // // //             setBookings(allBookings);
// // // //             await fetchRoomReviews(roomBookingsResponse.data);
// // // //             await fetchTransferReviews(transferBookingsResponse.data);
// // // //             await fetchFlightReviews(flightBookingsResponse.data);
// // // //             await fetchBicycleReviews(bicycleRentalsResponse.data);
// // // //         } catch (err) {
// // // //             setError('Failed to fetch bookings.');
// // // //             console.error('Error fetching bookings:', err);
// // // //         } finally {
// // // //             setLoading(false);
// // // //         }
// // // //     }, []);

// // // //     useEffect(() => {
// // // //         fetchMyBookings();
// // // //     }, [fetchMyBookings]);

// // // //     const onRoomReviewSubmitted = (roomId) => {
// // // //         fetchRoomReviews(bookings.filter(b => b.type === 'room'));
// // // //         setShowRoomReviewForm(null);
// // // //     };

// // // //     const onTransferReviewSubmitted = (transferId) => {
// // // //         fetchTransferReviews(bookings.filter(b => b.type === 'transfer'));
// // // //         setShowTransferReviewForm(null);
// // // //     };

// // // //     const onFlightReviewSubmitted = (flightId) => {
// // // //         fetchFlightReviews(bookings.filter(b => b.type === 'flight'));
// // // //         setShowFlightReviewForm(null);
// // // //     };

// // // //     const onBicycleReviewSubmitted = (rentalId) => {
// // // //         fetchBicycleReviews(bookings.filter(b => b.type === 'bicycle'));
// // // //         setShowBicycleReviewForm(null);
// // // //     };

// // // //     const handleCancelBooking = async (bookingId) => {
// // // //         const token = localStorage.getItem('token');
// // // //         if (!token) { showPopup('You must be logged in to cancel a booking.'); return; }
// // // //         try {
// // // //             await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, { headers: { 'x-auth-token': token } });
// // // //             showPopup('Room booking canceled successfully!');
// // // //             fetchMyBookings();
// // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel room booking.'); }
// // // //     };

// // // //     const handleCancelTransfer = async (transferId) => {
// // // //         const token = localStorage.getItem('token');
// // // //         if (!token) { showPopup('You must be logged in to cancel a transfer.'); return; }
// // // //         try {
// // // //             await axios.delete(`http://localhost:5000/api/private-transfers/${transferId}`, { headers: { 'x-auth-token': token } });
// // // //             showPopup('Transfer canceled successfully!');
// // // //             fetchMyBookings();
// // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel transfer.'); }
// // // //     };

// // // //     const handleCancelBicycleRental = async (rentalId) => {
// // // //         const token = localStorage.getItem('token');
// // // //         if (!token) { showPopup('You must be logged in to cancel a bicycle rental.'); return; }
// // // //         try {
// // // //             await axios.delete(`http://localhost:5000/api/bicycle-rentals/${rentalId}`, { headers: { 'x-auth-token': token } });
// // // //             showPopup('Bicycle rental canceled successfully!');
// // // //             fetchMyBookings();
// // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel bicycle rental.'); }
// // // //     };
    
// // // //     const handleCancelFlight = async (flightId) => {
// // // //         const token = localStorage.getItem('token');
// // // //         if (!token) { showPopup('You must be logged in to cancel a flight.'); return; }
// // // //         try {
// // // //             await axios.delete(`http://localhost:5000/api/flight-bookings/${flightId}`, { headers: { 'x-auth-token': token } });
// // // //             showPopup('Flight canceled successfully!');
// // // //             fetchMyBookings();
// // // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel flight.'); }
// // // //     };

// // // //     const handleCheckIn = () => {
// // // //         console.log('Checking in...');
// // // //         showPopup('Check-in successful!');
// // // //     };

// // // //     const handleCheckOut = () => {
// // // //         console.log('Checking out...');
// // // //         showPopup('Check-out successful!');
// // // //     };

// // // //     if (loading) {
// // // //         return <div className="text-center loading-message">Loading your bookings...</div>;
// // // //     }

// // // //     if (error) {
// // // //         return <div className="text-center error-message">{error}</div>;
// // // //     }

// // // //     return (
// // // //         <div className="container my-bookings-container">
// // // //             <h2 className="my-bookings-title">My Bookings</h2>
            
// // // //             {bookings.length > 0 ? (
// // // //                 <div className="bookings-list">
// // // //                     {bookings.map(item => (
// // // //                         <div key={item._id} className="booking-item-card card">
// // // //                             <div className="item-image-container">
// // // //                                 {item.type === 'room' ? (
// // // //                                     <img src={item.roomId?.image} alt={item.roomId?.title} className="item-image" />
// // // //                                 ) : item.type === 'transfer' ? (
// // // //                                     <div className="transport-icon-container">
// // // //                                         <i className="fas fa-car-side"></i>
// // // //                                     </div>
// // // //                                 ) : item.type === 'bicycle' ? (
// // // //                                     <div className="transport-icon-container">
// // // //                                         <i className="fas fa-bicycle"></i>
// // // //                                     </div>
// // // //                                 ) : (
// // // //                                     <div className="transport-icon-container">
// // // //                                         <i className="fas fa-plane"></i>
// // // //                                     </div>
// // // //                                 )}
// // // //                             </div>
// // // //                             <div className="item-details">
// // // //                                 {item.type === 'room' ? (
// // // //                                     <>
// // // //                                         <h4 className="item-title">{item.roomId?.title}</h4>
// // // //                                         <p><strong>Type:</strong> Room Booking</p>
// // // //                                         <p><strong>Check-in:</strong> {new Date(item.checkInDate).toLocaleDateString()}</p>
// // // //                                         <p><strong>Check-out:</strong> {new Date(item.checkOutDate).toLocaleDateString()}</p>
// // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // //                                         <div className="item-actions">
// // // //                                             <button className="btn-review" onClick={() => setShowRoomReviewForm(item.roomId?._id)}>
// // // //                                                 Write Review
// // // //                                             </button>
// // // //                                             <button className="btn-cancel" onClick={() => handleCancelBooking(item._id)}>
// // // //                                                 Cancel Room
// // // //                                             </button>
// // // //                                         </div>
// // // //                                     </>
// // // //                                 ) : item.type === 'transfer' ? (
// // // //                                     <>
// // // //                                         <h4 className="item-title">Private Transfer</h4>
// // // //                                         <p><strong>Type:</strong> {item.transferType}</p>
// // // //                                         <p><strong>Arrival Date:</strong> {new Date(item.arrivalDate).toLocaleDateString()}</p>
// // // //                                         <p><strong>Arrival Time:</strong> {item.arrivalTime}</p>
// // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // //                                         <div className="item-actions">
// // // //                                             <button className="btn-review" onClick={() => setShowTransferReviewForm(item._id)}>
// // // //                                                 Write Review
// // // //                                             </button>
// // // //                                             <button className="btn-cancel" onClick={() => handleCancelTransfer(item._id)}>
// // // //                                                 Cancel Transfer
// // // //                                             </button>
// // // //                                         </div>
// // // //                                     </>
// // // //                                 ) : item.type === 'bicycle' ? (
// // // //                                     <>
// // // //                                         <h4 className="item-title">Bicycle Rental</h4>
// // // //                                         <p><strong>Type:</strong> {item.bicycleType}</p>
// // // //                                         <p><strong>Rental Date:</strong> {new Date(item.rentalDate).toLocaleDateString()}</p>
// // // //                                         <p><strong>Duration:</strong> {item.rentalDuration} hours</p>
// // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // //                                         <div className="item-actions">
// // // //                                             <button className="btn-review" onClick={() => { /* No review form for bicycle for now */ showPopup('Coming Soon!'); }}>
// // // //                                                 Write Review
// // // //                                             </button>
// // // //                                             <button className="btn-cancel" onClick={() => handleCancelBicycleRental(item._id)}>
// // // //                                                 Cancel Rental
// // // //                                             </button>
// // // //                                         </div>
// // // //                                     </>
// // // //                                 ) : (
// // // //                                     <>
// // // //                                         <h4 className="item-title">Flight Booking</h4>
// // // //                                         <p><strong>From:</strong> {item.from} to {item.to}</p>
// // // //                                         <p><strong>Depart:</strong> {new Date(item.departureDate).toLocaleDateString()}</p>
// // // //                                         {item.returnDate && <p><strong>Return:</strong> {new Date(item.returnDate).toLocaleDateString()}</p>}
// // // //                                         <p><strong>Passengers:</strong> {item.passengers}</p>
// // // //                                         <p><strong>Class:</strong> {item.class}</p>
// // // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // // //                                         <div className="item-actions">
// // // //                                             <button className="btn-review" onClick={() => setShowFlightReviewForm(item._id)}>
// // // //                                                 Write Review
// // // //                                             </button>
// // // //                                             <button className="btn-cancel" onClick={() => handleCancelFlight(item._id)}>
// // // //                                                 Cancel Flight
// // // //                                             </button>
// // // //                                         </div>
// // // //                                     </>
// // // //                                 )}
// // // //                             </div>

// // // //                             {item.type === 'room' && showRoomReviewForm === item.roomId?._id && (
// // // //                                 <div className="review-section-in-card">
// // // //                                     <ReviewForm roomId={item.roomId?._id} onReviewSubmitted={() => onRoomReviewSubmitted(item.roomId?._id)} />
// // // //                                 </div>
// // // //                             )}

// // // //                             {item.type === 'transfer' && showTransferReviewForm === item._id && (
// // // //                                 <div className="review-section-in-card">
// // // //                                     <TransferReviewForm transferId={item._id} onReviewSubmitted={() => onTransferReviewSubmitted(item._id)} />
// // // //                                 </div>
// // // //                             )}

// // // //                             {item.type === 'flight' && showFlightReviewForm === item._id && (
// // // //                                 <div className="review-section-in-card">
// // // //                                     <FlightReviewForm flightId={item._id} onReviewSubmitted={() => onFlightReviewSubmitted(item._id)} />
// // // //                                 </div>
// // // //                             )}
// // // //                         </div>
// // // //                     ))}
// // // //                 </div>
// // // //             ) : (
// // // //                 <div className="no-bookings-found">
// // // //                     <p>You have no bookings yet. Go explore our options!</p>
// // // //                 </div>
// // // //             )}
            
// // // //             {/* New Check-in and Check-out button section */}
// // // //             <div className="check-actions-container">
// // // //                 <button className="btn btn-check-in" onClick={handleCheckIn}>Check In</button>
// // // //                 <button className="btn btn-check-out" onClick={handleCheckOut}>Check Out</button>
// // // //             </div>

// // // //             {isPopupVisible && (
// // // //                 <div className="popup-container">
// // // //                     <div className="popup-message">{popupMessage}</div>
// // // //                 </div>
// // // //             )}
// // // //         </div>
// // // //     );
// // // // };

// // // // export default MyBookings;



// // // // client/src/components/MyBookings.js
// // // import React, { useState, useEffect, useCallback } from 'react';
// // // import axios from 'axios';
// // // import ReviewForm from './ReviewForm';
// // // import TransferReviewForm from './TransferReviewForm';
// // // import FlightReviewForm from './FlightReviewForm';
// // // import BicycleReviewForm from './BicycleReviewForm';
// // // import '../App.css';

// // // const MyBookings = () => {
// // //     const [bookings, setBookings] = useState([]);
// // //     const [loading, setLoading] = useState(true);
// // //     const [error, setError] = useState(null);
// // //     const [roomReviews, setRoomReviews] = useState({});
// // //     const [transferReviews, setTransferReviews] = useState({});
// // //     const [flightReviews, setFlightReviews] = useState({});
// // //     const [bicycleReviews, setBicycleReviews] = useState({});
// // //     const [showRoomReviewForm, setShowRoomReviewForm] = useState(null);
// // //     const [showTransferReviewForm, setShowTransferReviewForm] = useState(null);
// // //     const [showFlightReviewForm, setShowFlightReviewForm] = useState(null);
// // //     const [showBicycleReviewForm, setShowBicycleReviewForm] = useState(null);
// // //     const [isPopupVisible, setIsPopupVisible] = useState(false);
// // //     const [popupMessage, setPopupMessage] = useState('');

// // //     const showPopup = (message) => {
// // //         setPopupMessage(message);
// // //         setIsPopupVisible(true);
// // //         setTimeout(() => {
// // //             setIsPopupVisible(false);
// // //         }, 3000);
// // //     };

// // //     const fetchRoomReviews = async (bookingsData) => {
// // //         const allReviews = {};
// // //         for (const booking of bookingsData) {
// // //             if (booking.roomId) {
// // //                 try {
// // //                     const response = await axios.get(`http://localhost:5000/api/reviews/${booking.roomId._id}`);
// // //                     allReviews[booking.roomId._id] = response.data;
// // //                 } catch (err) {
// // //                     console.error(`Failed to fetch reviews for room ${booking.roomId._id}:`, err);
// // //                 }
// // //             }
// // //         }
// // //         setRoomReviews(allReviews);
// // //     };

// // //     const fetchTransferReviews = async (transfersData) => {
// // //         const allReviews = {};
// // //         for (const transfer of transfersData) {
// // //             try {
// // //                 const response = await axios.get(`http://localhost:5000/api/transfer-reviews/${transfer._id}`);
// // //                 allReviews[transfer._id] = response.data;
// // //             } catch (err) {
// // //                 console.error(`Failed to fetch reviews for transfer ${transfer._id}:`, err);
// // //             }
// // //         }
// // //         setTransferReviews(allReviews);
// // //     };

// // //     const fetchFlightReviews = async (flightsData) => {
// // //         const allReviews = {};
// // //         for (const flight of flightsData) {
// // //             try {
// // //                 const response = await axios.get(`http://localhost:5000/api/flight-reviews/${flight._id}`);
// // //                 allReviews[flight._id] = response.data;
// // //             } catch (err) {
// // //                 console.error(`Failed to fetch reviews for flight ${flight._id}:`, err);
// // //             }
// // //         }
// // //         setFlightReviews(allReviews);
// // //     };

// // //     const fetchBicycleReviews = async (rentalsData) => {
// // //         const allReviews = {};
// // //         for (const rental of rentalsData) {
// // //             try {
// // //                 const response = await axios.get(`http://localhost:5000/api/bicycle-reviews/${rental._id}`);
// // //                 allReviews[rental._id] = response.data;
// // //             } catch (err) {
// // //                 console.error(`Failed to fetch reviews for bicycle rental ${rental._id}:`, err);
// // //             }
// // //         }
// // //         setBicycleReviews(allReviews);
// // //     };

// // //     const fetchMyBookings = useCallback(async () => {
// // //         const token = localStorage.getItem('token');
// // //         if (!token) {
// // //             setError('You are not logged in.');
// // //             setLoading(false);
// // //             return;
// // //         }

// // //         try {
// // //             const roomBookingsResponse = await axios.get('http://localhost:5000/api/bookings/mybookings', {
// // //                 headers: { 'x-auth-token': token },
// // //             });
// // //             const transferBookingsResponse = await axios.get('http://localhost:5000/api/private-transfers/mytransfers', {
// // //                 headers: { 'x-auth-token': token },
// // //             });
// // //             const bicycleRentalsResponse = await axios.get('http://localhost:5000/api/bicycle-rentals/myrentals', {
// // //                 headers: { 'x-auth-token': token },
// // //             });
// // //             const flightBookingsResponse = await axios.get('http://localhost:5000/api/flight-bookings/myflights', {
// // //                 headers: { 'x-auth-token': token },
// // //             });
            
// // //             const allBookings = [
// // //                 ...roomBookingsResponse.data.map(b => ({ ...b, type: 'room' })),
// // //                 ...transferBookingsResponse.data.map(b => ({ ...b, type: 'transfer' })),
// // //                 ...bicycleRentalsResponse.data.map(b => ({ ...b, type: 'bicycle' })),
// // //                 ...flightBookingsResponse.data.map(b => ({ ...b, type: 'flight' })),
// // //             ];

// // //             setBookings(allBookings);
// // //             await fetchRoomReviews(roomBookingsResponse.data);
// // //             await fetchTransferReviews(transferBookingsResponse.data);
// // //             await fetchFlightReviews(flightBookingsResponse.data);
// // //             await fetchBicycleReviews(bicycleRentalsResponse.data);
// // //         } catch (err) {
// // //             setError('Failed to fetch bookings.');
// // //             console.error('Error fetching bookings:', err);
// // //         } finally {
// // //             setLoading(false);
// // //         }
// // //     }, []);

// // //     useEffect(() => {
// // //         fetchMyBookings();
// // //     }, [fetchMyBookings]);

// // //     const onRoomReviewSubmitted = (roomId) => {
// // //         fetchRoomReviews(bookings.filter(b => b.type === 'room'));
// // //         setShowRoomReviewForm(null);
// // //     };

// // //     const onTransferReviewSubmitted = (transferId) => {
// // //         fetchTransferReviews(bookings.filter(b => b.type === 'transfer'));
// // //         setShowTransferReviewForm(null);
// // //     };

// // //     const onFlightReviewSubmitted = (flightId) => {
// // //         fetchFlightReviews(bookings.filter(b => b.type === 'flight'));
// // //         setShowFlightReviewForm(null);
// // //     };

// // //     const onBicycleReviewSubmitted = (rentalId) => {
// // //         fetchBicycleReviews(bookings.filter(b => b.type === 'bicycle'));
// // //         setShowBicycleReviewForm(null);
// // //     };

// // //     const handleCancelBooking = async (bookingId) => {
// // //         const token = localStorage.getItem('token');
// // //         if (!token) { showPopup('You must be logged in to cancel a booking.'); return; }
// // //         try {
// // //             await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, { headers: { 'x-auth-token': token } });
// // //             showPopup('Room booking canceled successfully!');
// // //             fetchMyBookings();
// // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel room booking.'); }
// // //     };

// // //     const handleCancelTransfer = async (transferId) => {
// // //         const token = localStorage.getItem('token');
// // //         if (!token) { showPopup('You must be logged in to cancel a transfer.'); return; }
// // //         try {
// // //             await axios.delete(`http://localhost:5000/api/private-transfers/${transferId}`, { headers: { 'x-auth-token': token } });
// // //             showPopup('Transfer canceled successfully!');
// // //             fetchMyBookings();
// // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel transfer.'); }
// // //     };

// // //     const handleCancelBicycleRental = async (rentalId) => {
// // //         const token = localStorage.getItem('token');
// // //         if (!token) { showPopup('You must be logged in to cancel a bicycle rental.'); return; }
// // //         try {
// // //             await axios.delete(`http://localhost:5000/api/bicycle-rentals/${rentalId}`, { headers: { 'x-auth-token': token } });
// // //             showPopup('Bicycle rental canceled successfully!');
// // //             fetchMyBookings();
// // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel bicycle rental.'); }
// // //     };
    
// // //     const handleCancelFlight = async (flightId) => {
// // //         const token = localStorage.getItem('token');
// // //         if (!token) { showPopup('You must be logged in to cancel a flight.'); return; }
// // //         try {
// // //             await axios.delete(`http://localhost:5000/api/flight-bookings/${flightId}`, { headers: { 'x-auth-token': token } });
// // //             showPopup('Flight canceled successfully!');
// // //             fetchMyBookings();
// // //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel flight.'); }
// // //     };

// // //     const handleCheckIn = async (bookingId) => {
// // //         const token = localStorage.getItem('token');
// // //         if (!token) { showPopup('You must be logged in to check in.'); return; }
// // //         try {
// // //             await axios.put(`http://localhost:5000/api/bookings/checkin/${bookingId}`, {}, { headers: { 'x-auth-token': token } });
// // //             showPopup('Check-in successful!');
// // //             fetchMyBookings(); // Refresh the booking list
// // //         } catch (err) {
// // //             showPopup(err.response?.data.msg || 'Failed to check in.');
// // //         }
// // //     };

// // //     const handleCheckOut = () => {
// // //         console.log('Checking out...');
// // //         showPopup('Check-out successful!');
// // //     };

// // //     if (loading) {
// // //         return <div className="text-center loading-message">Loading your bookings...</div>;
// // //     }

// // //     if (error) {
// // //         return <div className="text-center error-message">{error}</div>;
// // //     }

// // //     return (
// // //         <div className="container my-bookings-container">
// // //             <h2 className="my-bookings-title">My Bookings</h2>
            
// // //             {bookings.length > 0 ? (
// // //                 <div className="bookings-list">
// // //                     {bookings.map(item => (
// // //                         <div key={item._id} className="booking-item-card card">
// // //                             <div className="item-image-container">
// // //                                 {item.type === 'room' ? (
// // //                                     <img src={item.roomId?.image} alt={item.roomId?.title} className="item-image" />
// // //                                 ) : item.type === 'transfer' ? (
// // //                                     <div className="transport-icon-container">
// // //                                         <i className="fas fa-car-side"></i>
// // //                                     </div>
// // //                                 ) : item.type === 'bicycle' ? (
// // //                                     <div className="transport-icon-container">
// // //                                         <i className="fas fa-bicycle"></i>
// // //                                     </div>
// // //                                 ) : (
// // //                                     <div className="transport-icon-container">
// // //                                         <i className="fas fa-plane"></i>
// // //                                     </div>
// // //                                 )}
// // //                             </div>
// // //                             <div className="item-details">
// // //                                 {item.type === 'room' ? (
// // //                                     <>
// // //                                         <h4 className="item-title">{item.roomId?.title}</h4>
// // //                                         <p><strong>Type:</strong> Room Booking</p>
// // //                                         <p><strong>Check-in:</strong> {new Date(item.checkInDate).toLocaleDateString()}</p>
// // //                                         <p><strong>Check-out:</strong> {new Date(item.checkOutDate).toLocaleDateString()}</p>
// // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // //                                         <div className="item-actions">
// // //                                             {item.status === 'booked' && (
// // //                                                 <button className="btn-review" onClick={() => handleCheckIn(item._id)}>
// // //                                                     Check In
// // //                                                 </button>
// // //                                             )}
// // //                                             <button className="btn-review" onClick={() => setShowRoomReviewForm(item.roomId?._id)}>
// // //                                                 Write Review
// // //                                             </button>
// // //                                             <button className="btn-cancel" onClick={() => handleCancelBooking(item._id)}>
// // //                                                 Cancel Room
// // //                                             </button>
// // //                                         </div>
// // //                                     </>
// // //                                 ) : item.type === 'transfer' ? (
// // //                                     <>
// // //                                         <h4 className="item-title">Private Transfer</h4>
// // //                                         <p><strong>Type:</strong> {item.transferType}</p>
// // //                                         <p><strong>Arrival Date:</strong> {new Date(item.arrivalDate).toLocaleDateString()}</p>
// // //                                         <p><strong>Arrival Time:</strong> {item.arrivalTime}</p>
// // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // //                                         <div className="item-actions">
// // //                                             <button className="btn-review" onClick={() => setShowTransferReviewForm(item._id)}>
// // //                                                 Write Review
// // //                                             </button>
// // //                                             <button className="btn-cancel" onClick={() => handleCancelTransfer(item._id)}>
// // //                                                 Cancel Transfer
// // //                                             </button>
// // //                                         </div>
// // //                                     </>
// // //                                 ) : item.type === 'bicycle' ? (
// // //                                     <>
// // //                                         <h4 className="item-title">Bicycle Rental</h4>
// // //                                         <p><strong>Type:</strong> {item.bicycleType}</p>
// // //                                         <p><strong>Rental Date:</strong> {new Date(item.rentalDate).toLocaleDateString()}</p>
// // //                                         <p><strong>Duration:</strong> {item.rentalDuration} hours</p>
// // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // //                                         <div className="item-actions">
// // //                                             <button className="btn-review" onClick={() => setShowBicycleReviewForm(item._id)}>
// // //                                                 Write Review
// // //                                             </button>
// // //                                             <button className="btn-cancel" onClick={() => handleCancelBicycleRental(item._id)}>
// // //                                                 Cancel Rental
// // //                                             </button>
// // //                                         </div>
// // //                                     </>
// // //                                 ) : (
// // //                                     <>
// // //                                         <h4 className="item-title">Flight Booking</h4>
// // //                                         <p><strong>From:</strong> {item.from} to {item.to}</p>
// // //                                         <p><strong>Depart:</strong> {new Date(item.departureDate).toLocaleDateString()}</p>
// // //                                         {item.returnDate && <p><strong>Return:</strong> {new Date(item.returnDate).toLocaleDateString()}</p>}
// // //                                         <p><strong>Passengers:</strong> {item.passengers}</p>
// // //                                         <p><strong>Class:</strong> {item.class}</p>
// // //                                         <p className="item-price">BDT {item.totalPrice}</p>
// // //                                         <div className="item-actions">
// // //                                             <button className="btn-review" onClick={() => setShowFlightReviewForm(item._id)}>
// // //                                                 Write Review
// // //                                             </button>
// // //                                             <button className="btn-cancel" onClick={() => handleCancelFlight(item._id)}>
// // //                                                 Cancel Flight
// // //                                             </button>
// // //                                         </div>
// // //                                     </>
// // //                                 )}
// // //                             </div>

// // //                             {item.type === 'room' && showRoomReviewForm === item.roomId?._id && (
// // //                                 <div className="review-section-in-card">
// // //                                     <ReviewForm roomId={item.roomId?._id} onReviewSubmitted={() => onRoomReviewSubmitted(item.roomId?._id)} />
// // //                                 </div>
// // //                             )}

// // //                             {item.type === 'transfer' && showTransferReviewForm === item._id && (
// // //                                 <div className="review-section-in-card">
// // //                                     <TransferReviewForm transferId={item._id} onReviewSubmitted={() => onTransferReviewSubmitted(item._id)} />
// // //                                 </div>
// // //                             )}

// // //                             {item.type === 'bicycle' && showBicycleReviewForm === item._id && (
// // //                                 <div className="review-section-in-card">
// // //                                     <BicycleReviewForm rentalId={item._id} onReviewSubmitted={() => onBicycleReviewSubmitted(item._id)} />
// // //                                 </div>
// // //                             )}

// // //                             {item.type === 'flight' && showFlightReviewForm === item._id && (
// // //                                 <div className="review-section-in-card">
// // //                                     <FlightReviewForm flightId={item._id} onReviewSubmitted={() => onFlightReviewSubmitted(item._id)} />
// // //                                 </div>
// // //                             )}
// // //                         </div>
// // //                     ))}
// // //                 </div>
// // //             ) : (
// // //                 <div className="no-bookings-found">
// // //                     <p>You have no bookings yet. Go explore our options!</p>
// // //                 </div>
// // //             )}
            
// // //             {isPopupVisible && (
// // //                 <div className="popup-container">
// // //                     <div className="popup-message">{popupMessage}</div>
// // //                 </div>
// // //             )}
// // //         </div>
// // //     );
// // // };

// // // export default MyBookings;

























// // // client/src/components/MyBookings.js
// // import React, { useState, useEffect, useCallback } from 'react';
// // import axios from 'axios';
// // import ReviewForm from './ReviewForm';
// // import TransferReviewForm from './TransferReviewForm';
// // import FlightReviewForm from './FlightReviewForm';
// // import BicycleReviewForm from './BicycleReviewForm';
// // import '../App.css';

// // const MyBookings = () => {
// //     const [bookings, setBookings] = useState([]);
// //     const [loading, setLoading] = useState(true);
// //     const [error, setError] = useState(null);
// //     const [roomReviews, setRoomReviews] = useState({});
// //     const [transferReviews, setTransferReviews] = useState({});
// //     const [flightReviews, setFlightReviews] = useState({});
// //     const [bicycleReviews, setBicycleReviews] = useState({});
// //     const [showRoomReviewForm, setShowRoomReviewForm] = useState(null);
// //     const [showTransferReviewForm, setShowTransferReviewForm] = useState(null);
// //     const [showFlightReviewForm, setShowFlightReviewForm] = useState(null);
// //     const [showBicycleReviewForm, setShowBicycleReviewForm] = useState(null);
// //     const [isPopupVisible, setIsPopupVisible] = useState(false);
// //     const [popupMessage, setPopupMessage] = useState('');

// //     const showPopup = (message) => {
// //         setPopupMessage(message);
// //         setIsPopupVisible(true);
// //         setTimeout(() => {
// //             setIsPopupVisible(false);
// //         }, 3000);
// //     };

// //     const fetchRoomReviews = async (bookingsData) => {
// //         const allReviews = {};
// //         for (const booking of bookingsData) {
// //             if (booking.roomId) {
// //                 try {
// //                     const response = await axios.get(`http://localhost:5000/api/reviews/${booking.roomId._id}`);
// //                     allReviews[booking.roomId._id] = response.data;
// //                 } catch (err) {
// //                     console.error(`Failed to fetch reviews for room ${booking.roomId._id}:`, err);
// //                 }
// //             }
// //         }
// //         setRoomReviews(allReviews);
// //     };

// //     const fetchTransferReviews = async (transfersData) => {
// //         const allReviews = {};
// //         for (const transfer of transfersData) {
// //             try {
// //                 const response = await axios.get(`http://localhost:5000/api/transfer-reviews/${transfer._id}`);
// //                 allReviews[transfer._id] = response.data;
// //             } catch (err) {
// //                 console.error(`Failed to fetch reviews for transfer ${transfer._id}:`, err);
// //             }
// //         }
// //         setTransferReviews(allReviews);
// //     };

// //     const fetchFlightReviews = async (flightsData) => {
// //         const allReviews = {};
// //         for (const flight of flightsData) {
// //             try {
// //                 const response = await axios.get(`http://localhost:5000/api/flight-reviews/${flight._id}`);
// //                 allReviews[flight._id] = response.data;
// //             } catch (err) {
// //                 console.error(`Failed to fetch reviews for flight ${flight._id}:`, err);
// //             }
// //         }
// //         setFlightReviews(allReviews);
// //     };

// //     const fetchBicycleReviews = async (rentalsData) => {
// //         const allReviews = {};
// //         for (const rental of rentalsData) {
// //             try {
// //                 const response = await axios.get(`http://localhost:5000/api/bicycle-reviews/${rental._id}`);
// //                 allReviews[rental._id] = response.data;
// //             } catch (err) {
// //                 console.error(`Failed to fetch reviews for bicycle rental ${rental._id}:`, err);
// //             }
// //         }
// //         setBicycleReviews(allReviews);
// //     };

// //     const fetchMyBookings = useCallback(async () => {
// //         const token = localStorage.getItem('token');
// //         if (!token) {
// //             setError('You are not logged in.');
// //             setLoading(false);
// //             return;
// //         }

// //         try {
// //             const roomBookingsResponse = await axios.get('http://localhost:5000/api/bookings/mybookings', {
// //                 headers: { 'x-auth-token': token },
// //             });
// //             const transferBookingsResponse = await axios.get('http://localhost:5000/api/private-transfers/mytransfers', {
// //                 headers: { 'x-auth-token': token },
// //             });
// //             const bicycleRentalsResponse = await axios.get('http://localhost:5000/api/bicycle-rentals/myrentals', {
// //                 headers: { 'x-auth-token': token },
// //             });
// //             const flightBookingsResponse = await axios.get('http://localhost:5000/api/flight-bookings/myflights', {
// //                 headers: { 'x-auth-token': token },
// //             });
            
// //             const allBookings = [
// //                 ...roomBookingsResponse.data.map(b => ({ ...b, type: 'room' })),
// //                 ...transferBookingsResponse.data.map(b => ({ ...b, type: 'transfer' })),
// //                 ...bicycleRentalsResponse.data.map(b => ({ ...b, type: 'bicycle' })),
// //                 ...flightBookingsResponse.data.map(b => ({ ...b, type: 'flight' })),
// //             ];

// //             setBookings(allBookings);
// //             await fetchRoomReviews(roomBookingsResponse.data);
// //             await fetchTransferReviews(transferBookingsResponse.data);
// //             await fetchFlightReviews(flightBookingsResponse.data);
// //             await fetchBicycleReviews(bicycleRentalsResponse.data);
// //         } catch (err) {
// //             setError('Failed to fetch bookings.');
// //             console.error('Error fetching bookings:', err);
// //         } finally {
// //             setLoading(false);
// //         }
// //     }, []);

// //     useEffect(() => {
// //         fetchMyBookings();
// //     }, [fetchMyBookings]);

// //     const onRoomReviewSubmitted = (roomId) => {
// //         fetchRoomReviews(bookings.filter(b => b.type === 'room'));
// //         setShowRoomReviewForm(null);
// //     };

// //     const onTransferReviewSubmitted = (transferId) => {
// //         fetchTransferReviews(bookings.filter(b => b.type === 'transfer'));
// //         setShowTransferReviewForm(null);
// //     };

// //     const onFlightReviewSubmitted = (flightId) => {
// //         fetchFlightReviews(bookings.filter(b => b.type === 'flight'));
// //         setShowFlightReviewForm(null);
// //     };

// //     const onBicycleReviewSubmitted = (rentalId) => {
// //         fetchBicycleReviews(bookings.filter(b => b.type === 'bicycle'));
// //         setShowBicycleReviewForm(null);
// //     };

// //     const handleCancelBooking = async (bookingId) => {
// //         const token = localStorage.getItem('token');
// //         if (!token) { showPopup('You must be logged in to cancel a booking.'); return; }
// //         try {
// //             await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, { headers: { 'x-auth-token': token } });
// //             showPopup('Room booking canceled successfully!');
// //             fetchMyBookings();
// //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel room booking.'); }
// //     };

// //     const handleCancelTransfer = async (transferId) => {
// //         const token = localStorage.getItem('token');
// //         if (!token) { showPopup('You must be logged in to cancel a transfer.'); return; }
// //         try {
// //             await axios.delete(`http://localhost:5000/api/private-transfers/${transferId}`, { headers: { 'x-auth-token': token } });
// //             showPopup('Transfer canceled successfully!');
// //             fetchMyBookings();
// //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel transfer.'); }
// //     };

// //     const handleCancelBicycleRental = async (rentalId) => {
// //         const token = localStorage.getItem('token');
// //         if (!token) { showPopup('You must be logged in to cancel a bicycle rental.'); return; }
// //         try {
// //             await axios.delete(`http://localhost:5000/api/bicycle-rentals/${rentalId}`, { headers: { 'x-auth-token': token } });
// //             showPopup('Bicycle rental canceled successfully!');
// //             fetchMyBookings();
// //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel bicycle rental.'); }
// //     };
    
// //     const handleCancelFlight = async (flightId) => {
// //         const token = localStorage.getItem('token');
// //         if (!token) { showPopup('You must be logged in to cancel a flight.'); return; }
// //         try {
// //             await axios.delete(`http://localhost:5000/api/flight-bookings/${flightId}`, { headers: { 'x-auth-token': token } });
// //             showPopup('Flight canceled successfully!');
// //             fetchMyBookings();
// //         } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel flight.'); }
// //     };

// //     const handleCheckIn = async (bookingId) => {
// //         const token = localStorage.getItem('token');
// //         if (!token) { showPopup('You must be logged in to check in.'); return; }
// //         try {
// //             await axios.put(`http://localhost:5000/api/bookings/checkin/${bookingId}`, {}, { headers: { 'x-auth-token': token } });
// //             showPopup('Check-in successful!');
// //             fetchMyBookings();
// //         } catch (err) {
// //             showPopup(err.response?.data.msg || 'Failed to check in.');
// //         }
// //     };

// //     const handleCheckOut = async (bookingId) => {
// //         const token = localStorage.getItem('token');
// //         if (!token) { showPopup('You must be logged in to check out.'); return; }
// //         try {
// //             await axios.put(`http://localhost:5000/api/bookings/checkout/${bookingId}`, {}, { headers: { 'x-auth-token': token } });
// //             showPopup('Check-out successful!');
// //             fetchMyBookings();
// //         } catch (err) {
// //             showPopup(err.response?.data.msg || 'Failed to check out.');
// //         }
// //     };

// //     if (loading) {
// //         return <div className="text-center loading-message">Loading your bookings...</div>;
// //     }

// //     if (error) {
// //         return <div className="text-center error-message">{error}</div>;
// //     }

// //     return (
// //         <div className="container my-bookings-container">
// //             <h2 className="my-bookings-title">My Bookings</h2>
            
// //             {bookings.length > 0 ? (
// //                 <div className="bookings-list">
// //                     {bookings.map(item => (
// //                         <div key={item._id} className="booking-item-card card">
// //                             <div className="item-image-container">
// //                                 {item.type === 'room' ? (
// //                                     <img src={item.roomId?.image} alt={item.roomId?.title} className="item-image" />
// //                                 ) : item.type === 'transfer' ? (
// //                                     <div className="transport-icon-container">
// //                                         <i className="fas fa-car-side"></i>
// //                                     </div>
// //                                 ) : item.type === 'bicycle' ? (
// //                                     <div className="transport-icon-container">
// //                                         <i className="fas fa-bicycle"></i>
// //                                     </div>
// //                                 ) : (
// //                                     <div className="transport-icon-container">
// //                                         <i className="fas fa-plane"></i>
// //                                     </div>
// //                                 )}
// //                             </div>
// //                             <div className="item-details">
// //                                 {item.type === 'room' ? (
// //                                     <>
// //                                         <h4 className="item-title">{item.roomId?.title}</h4>
// //                                         <p><strong>Type:</strong> Room Booking</p>
// //                                         <p><strong>Check-in:</strong> {new Date(item.checkInDate).toLocaleDateString()}</p>
// //                                         <p><strong>Check-out:</strong> {new Date(item.checkOutDate).toLocaleDateString()}</p>
// //                                         <p className="item-price">BDT {item.totalPrice}</p>
// //                                         <p className="item-status">Status: {item.status === 'checked_in' ? 'Checked In' : 'Booked'}</p>
// //                                         <div className="item-actions">
// //                                             {item.status === 'booked' && (
// //                                                 <button className="btn-review" onClick={() => handleCheckIn(item._id)}>
// //                                                     Check In
// //                                                 </button>
// //                                             )}
// //                                             {item.status === 'checked_in' && (
// //                                                 <button className="btn-review" onClick={() => handleCheckOut(item._id)}>
// //                                                     Check Out
// //                                                 </button>
// //                                             )}
// //                                             <button className="btn-review" onClick={() => setShowRoomReviewForm(item.roomId?._id)}>
// //                                                 Write Review
// //                                             </button>
// //                                             <button className="btn-cancel" onClick={() => handleCancelBooking(item._id)}>
// //                                                 Cancel Room
// //                                             </button>
// //                                         </div>
// //                                     </>
// //                                 ) : item.type === 'transfer' ? (
// //                                     <>
// //                                         <h4 className="item-title">Private Transfer</h4>
// //                                         <p><strong>Type:</strong> {item.transferType}</p>
// //                                         <p><strong>Arrival Date:</strong> {new Date(item.arrivalDate).toLocaleDateString()}</p>
// //                                         <p><strong>Arrival Time:</strong> {item.arrivalTime}</p>
// //                                         <p className="item-price">BDT {item.totalPrice}</p>
// //                                         <div className="item-actions">
// //                                             <button className="btn-review" onClick={() => setShowTransferReviewForm(item._id)}>
// //                                                 Write Review
// //                                             </button>
// //                                             <button className="btn-cancel" onClick={() => handleCancelTransfer(item._id)}>
// //                                                 Cancel Transfer
// //                                             </button>
// //                                         </div>
// //                                     </>
// //                                 ) : item.type === 'bicycle' ? (
// //                                     <>
// //                                         <h4 className="item-title">Bicycle Rental</h4>
// //                                         <p><strong>Type:</strong> {item.bicycleType}</p>
// //                                         <p><strong>Rental Date:</strong> {new Date(item.rentalDate).toLocaleDateString()}</p>
// //                                         <p><strong>Duration:</strong> {item.rentalDuration} hours</p>
// //                                         <p className="item-price">BDT {item.totalPrice}</p>
// //                                         <div className="item-actions">
// //                                             <button className="btn-review" onClick={() => setShowBicycleReviewForm(item._id)}>
// //                                                 Write Review
// //                                             </button>
// //                                             <button className="btn-cancel" onClick={() => handleCancelBicycleRental(item._id)}>
// //                                                 Cancel Rental
// //                                             </button>
// //                                         </div>
// //                                     </>
// //                                 ) : (
// //                                     <>
// //                                         <h4 className="item-title">Flight Booking</h4>
// //                                         <p><strong>From:</strong> {item.from} to {item.to}</p>
// //                                         <p><strong>Depart:</strong> {new Date(item.departureDate).toLocaleDateString()}</p>
// //                                         {item.returnDate && <p><strong>Return:</strong> {new Date(item.returnDate).toLocaleDateString()}</p>}
// //                                         <p><strong>Passengers:</strong> {item.passengers}</p>
// //                                         <p><strong>Class:</strong> {item.class}</p>
// //                                         <p className="item-price">BDT {item.totalPrice}</p>
// //                                         <div className="item-actions">
// //                                             <button className="btn-review" onClick={() => setShowFlightReviewForm(item._id)}>
// //                                                 Write Review
// //                                             </button>
// //                                             <button className="btn-cancel" onClick={() => handleCancelFlight(item._id)}>
// //                                                 Cancel Flight
// //                                             </button>
// //                                         </div>
// //                                     </>
// //                                 )}
// //                             </div>

// //                             {item.type === 'room' && showRoomReviewForm === item.roomId?._id && (
// //                                 <div className="review-section-in-card">
// //                                     <ReviewForm roomId={item.roomId?._id} onReviewSubmitted={() => onRoomReviewSubmitted(item.roomId?._id)} />
// //                                 </div>
// //                             )}

// //                             {item.type === 'transfer' && showTransferReviewForm === item._id && (
// //                                 <div className="review-section-in-card">
// //                                     <TransferReviewForm transferId={item._id} onReviewSubmitted={() => onTransferReviewSubmitted(item._id)} />
// //                                 </div>
// //                             )}

// //                             {item.type === 'bicycle' && showBicycleReviewForm === item._id && (
// //                                 <div className="review-section-in-card">
// //                                     <BicycleReviewForm rentalId={item._id} onReviewSubmitted={() => onBicycleReviewSubmitted(item._id)} />
// //                                 </div>
// //                             )}

// //                             {item.type === 'flight' && showFlightReviewForm === item._id && (
// //                                 <div className="review-section-in-card">
// //                                     <FlightReviewForm flightId={item._id} onReviewSubmitted={() => onFlightReviewSubmitted(item._id)} />
// //                                 </div>
// //                             )}
// //                         </div>
// //                     ))}
// //                 </div>
// //             ) : (
// //                 <div className="no-bookings-found">
// //                     <p>You have no bookings yet. Go explore our options!</p>
// //                 </div>
// //             )}
            
// //             {isPopupVisible && (
// //                 <div className="popup-container">
// //                     <div className="popup-message">{popupMessage}</div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // };

// // export default MyBookings;




// client/src/components/MyBookings.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReviewForm from './ReviewForm';
import TransferReviewForm from './TransferReviewForm';
import '../App.css';

const MyBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [roomReviews, setRoomReviews] = useState({});
    const [transferReviews, setTransferReviews] = useState({});
    const [showRoomReviewForm, setShowRoomReviewForm] = useState(null);
    const [showTransferReviewForm, setShowTransferReviewForm] = useState(null);
    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');

    const showPopup = (message) => {
        setPopupMessage(message);
        setIsPopupVisible(true);
        setTimeout(() => {
            setIsPopupVisible(false);
        }, 3000);
    };

    const fetchRoomReviews = async (bookingsData) => {
        const allReviews = {};
        for (const booking of bookingsData) {
            if (booking.roomId) {
                try {
                    const response = await axios.get(`http://localhost:5000/api/reviews/${booking.roomId._id}`);
                    allReviews[booking.roomId._id] = response.data;
                } catch (err) {
                    console.error(`Failed to fetch reviews for room ${booking.roomId._id}:`, err);
                }
            }
        }
        setRoomReviews(allReviews);
    };

    const fetchTransferReviews = async (transfersData) => {
        const allReviews = {};
        for (const transfer of transfersData) {
            try {
                const response = await axios.get(`http://localhost:5000/api/transfer-reviews/${transfer._id}`);
                allReviews[transfer._id] = response.data;
            } catch (err) {
                console.error(`Failed to fetch reviews for transfer ${transfer._id}:`, err);
            }
        }
        setTransferReviews(allReviews);
    };

    const fetchMyBookings = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError('You are not logged in.');
            setLoading(false);
            return;
        }

        try {
            const roomBookingsResponse = await axios.get('http://localhost:5000/api/bookings/mybookings', {
                headers: { 'x-auth-token': token },
            });
            const transferBookingsResponse = await axios.get('http://localhost:5000/api/private-transfers/mytransfers', {
                headers: { 'x-auth-token': token },
            });
            const bicycleRentalsResponse = await axios.get('http://localhost:5000/api/bicycle-rentals/myrentals', {
                headers: { 'x-auth-token': token },
            });
            const flightBookingsResponse = await axios.get('http://localhost:5000/api/flight-bookings/myflights', {
                headers: { 'x-auth-token': token },
            });
            
            const allBookings = [
                ...roomBookingsResponse.data.map(b => ({ ...b, type: 'room' })),
                ...transferBookingsResponse.data.map(b => ({ ...b, type: 'transfer' })),
                ...bicycleRentalsResponse.data.map(b => ({ ...b, type: 'bicycle' })),
                ...flightBookingsResponse.data.map(b => ({ ...b, type: 'flight' })),
            ];

            setBookings(allBookings);
            await fetchRoomReviews(roomBookingsResponse.data);
            await fetchTransferReviews(transferBookingsResponse.data);
        } catch (err) {
            setError('Failed to fetch bookings.');
            console.error('Error fetching bookings:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMyBookings();
    }, []);

    const onRoomReviewSubmitted = (roomId) => {
        fetchRoomReviews(bookings.filter(b => b.type === 'room'));
        setShowRoomReviewForm(null);
    };

    const onTransferReviewSubmitted = (transferId) => {
        fetchTransferReviews(bookings.filter(b => b.type === 'transfer'));
        setShowTransferReviewForm(null);
    };

    const handleCancelBooking = async (bookingId) => {
        const token = localStorage.getItem('token');
        if (!token) { showPopup('You must be logged in to cancel a booking.'); return; }
        try {
            await axios.delete(`http://localhost:5000/api/bookings/${bookingId}`, { headers: { 'x-auth-token': token } });
            showPopup('Room booking canceled successfully!');
            fetchMyBookings();
        } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel room booking.'); }
    };

    const handleCancelTransfer = async (transferId) => {
        const token = localStorage.getItem('token');
        if (!token) { showPopup('You must be logged in to cancel a transfer.'); return; }
        try {
            await axios.delete(`http://localhost:5000/api/private-transfers/${transferId}`, { headers: { 'x-auth-token': token } });
            showPopup('Transfer canceled successfully!');
            fetchMyBookings();
        } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel transfer.'); }
    };

    const handleCancelBicycleRental = async (rentalId) => {
        const token = localStorage.getItem('token');
        if (!token) { showPopup('You must be logged in to cancel a bicycle rental.'); return; }
        try {
            await axios.delete(`http://localhost:5000/api/bicycle-rentals/${rentalId}`, { headers: { 'x-auth-token': token } });
            showPopup('Bicycle rental canceled successfully!');
            fetchMyBookings();
        } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel bicycle rental.'); }
    };

    // New function to handle canceling a flight booking
    const handleCancelFlightBooking = async (bookingId) => {
        const token = localStorage.getItem('token');
        if (!token) { showPopup('You must be logged in to cancel a flight booking.'); return; }
        try {
            await axios.delete(`http://localhost:5000/api/flight-bookings/${bookingId}`, { headers: { 'x-auth-token': token } });
            showPopup('Flight booking canceled successfully!');
            fetchMyBookings();
        } catch (err) { showPopup(err.response.data.msg || 'Failed to cancel flight booking.'); }
    };

    const calculateCartTotal = () => {
        return bookings.reduce((total, item) => total + item.totalPrice, 0);
    };

    if (loading) {
        return <div className="text-center loading-message">Loading your bookings...</div>;
    }

    if (error) {
        return <div className="text-center error-message">{error}</div>;
    }

    return (
        <div className="container my-bookings-container">
            <h2 className="my-bookings-title">My Bookings</h2>
            
            {bookings.length > 0 ? (
                <div className="bookings-list">
                    {bookings.map(item => (
                        <div key={item._id} className="booking-item-card card">
                            <div className="item-image-container">
                                {item.type === 'room' ? (
                                    <img src={item.roomId?.image} alt={item.roomId?.title} className="item-image" />
                                ) : item.type === 'transfer' ? (
                                    <div className="transport-icon-container">
                                        <i className="fas fa-car-side"></i>
                                    </div>
                                ) : item.type === 'bicycle' ? (
                                    <div className="transport-icon-container">
                                        <i className="fas fa-bicycle"></i>
                                    </div>
                                ) : (
                                    <div className="transport-icon-container">
                                        <i className="fas fa-plane-departure"></i>
                                    </div>
                                )}
                            </div>
                            <div className="item-details">
                                {item.type === 'room' ? (
                                    <>
                                        <h4 className="item-title">{item.roomId?.title}</h4>
                                        <p><strong>Type:</strong> Room Booking</p>
                                        <p><strong>Check-in:</strong> {new Date(item.checkInDate).toLocaleDateString()}</p>
                                        <p><strong>Check-out:</strong> {new Date(item.checkOutDate).toLocaleDateString()}</p>
                                        <p className="item-price">BDT {item.totalPrice}</p>
                                        <div className="item-actions">
                                            <button className="btn-review" onClick={() => setShowRoomReviewForm(item.roomId?._id)}>
                                                Write Review
                                            </button>
                                            <button className="btn-cancel" onClick={() => handleCancelBooking(item._id)}>
                                                Cancel Room
                                            </button>
                                        </div>
                                    </>
                                ) : item.type === 'transfer' ? (
                                    <>
                                        <h4 className="item-title">Private Transfer</h4>
                                        <p><strong>Type:</strong> {item.transferType}</p>
                                        <p><strong>Arrival Date:</strong> {new Date(item.arrivalDate).toLocaleDateString()}</p>
                                        <p><strong>Arrival Time:</strong> {item.arrivalTime}</p>
                                        <p className="item-price">BDT {item.totalPrice}</p>
                                        <div className="item-actions">
                                            <button className="btn-review" onClick={() => setShowTransferReviewForm(item._id)}>
                                                Write Review
                                            </button>
                                            <button className="btn-cancel" onClick={() => handleCancelTransfer(item._id)}>
                                                Cancel Transfer
                                            </button>
                                        </div>
                                    </>
                                ) : item.type === 'bicycle' ? (
                                    <>
                                        <h4 className="item-title">Bicycle Rental</h4>
                                        <p><strong>Type:</strong> {item.bicycleType}</p>
                                        <p><strong>Rental Date:</strong> {new Date(item.rentalDate).toLocaleDateString()}</p>
                                        <p><strong>Duration:</strong> {item.rentalDuration} hours</p>
                                        <p className="item-price">BDT {item.totalPrice}</p>
                                        <div className="item-actions">
                                            <button className="btn-cancel" onClick={() => handleCancelBicycleRental(item._id)}>
                                                Cancel Rental
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <h4 className="item-title">Flight Booking</h4>
                                        <p><strong>Trip:</strong> {item.from} to {item.to}</p>
                                        <p><strong>Departure:</strong> {new Date(item.departureDate).toLocaleDateString()}</p>
                                        {item.returnDate && <p><strong>Return:</strong> {new Date(item.returnDate).toLocaleDateString()}</p>}
                                        <p><strong>Passengers:</strong> {item.passengers} ({item.flightClass})</p>
                                        <p className="item-price">BDT {item.totalPrice}</p>
                                        <div className="item-actions">
                                            <button className="btn-cancel" onClick={() => handleCancelFlightBooking(item._id)}>
                                                Cancel Flight
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                            {item.type === 'room' && showRoomReviewForm === item.roomId?._id && (
                                <div className="review-section-in-card">
                                    <ReviewForm roomId={item.roomId?._id} onReviewSubmitted={() => onRoomReviewSubmitted(item.roomId?._id)} />
                                    {roomReviews[item.roomId?._id] && roomReviews[item.roomId._id].length > 0 && (
                                        <div className="reviews-list-in-card">
                                            <h5>Your Review:</h5>
                                            {roomReviews[item.roomId._id].map(review => (
                                                <div key={review._id} className="review-item">
                                                    <p><strong>{review.userId.username}</strong> rated it {review.rating}/5</p>
                                                    <p>"{review.comment}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                            {item.type === 'transfer' && showTransferReviewForm === item._id && (
                                <div className="review-section-in-card">
                                    <TransferReviewForm transferId={item._id} onReviewSubmitted={() => onTransferReviewSubmitted(item._id)} />
                                    {transferReviews[item._id] && transferReviews[item._id].length > 0 && (
                                        <div className="reviews-list-in-card">
                                            <h5>Your Review:</h5>
                                            {transferReviews[item._id].map(review => (
                                                <div key={review._id} className="review-item">
                                                    <p><strong>{review.userId.username}</strong> rated it {review.rating}/5</p>
                                                    <p>"{review.comment}"</p>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-bookings-found">
                    <p>You have no bookings yet. Go explore our options!</p>
                </div>
            )}
            <div className="cart-summary card">
                <h3>Total Due:</h3>
                <h3 className="total-due">BDT {calculateCartTotal()}</h3>
                <button className="btn btn-primary checkout-btn">Proceed to Checkout</button>
            </div>
            {isPopupVisible && (
                <div className="popup-container">
                    <div className="popup-message">{popupMessage}</div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;