// // client/src/components/BookingForm.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useParams, useNavigate } from 'react-router-dom';
// import '../App.css';

// const BookingForm = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [room, setRoom] = useState(null);
//   const [formData, setFormData] = useState({
//     userName: '',
//     userPhone: '',
//     checkInDate: '',
//     checkOutDate: '',
//   });
//   const [totalPrice, setTotalPrice] = useState(0);
//   const [popupMessage, setPopupMessage] = useState('');
//   const [isPopupVisible, setIsPopupVisible] = useState(false);

//   useEffect(() => {
//     const fetchRoomDetails = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
//         setRoom(response.data);
//       } catch (err) {
//         console.error('Error fetching room details:', err);
//       }
//     };
//     fetchRoomDetails();
//   }, [id]);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const calculateTotalPrice = () => {
//     const checkIn = new Date(formData.checkInDate);
//     const checkOut = new Date(formData.checkOutDate);
//     if (checkIn && checkOut && room) {
//       const oneDay = 24 * 60 * 60 * 1000;
//       const nights = Math.round(Math.abs((checkOut - checkIn) / oneDay));
//       setTotalPrice(nights * room.price);
//     }
//   };

//   useEffect(() => {
//     calculateTotalPrice();
//   }, [formData, room]);

//   const showPopup = (message) => {
//     setPopupMessage(message);
//     setIsPopupVisible(true);
//     setTimeout(() => {
//       setIsPopupVisible(false);
//     }, 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     if (!token) {
//       showPopup('You must be logged in to book a room.');
//       return;
//     }
    
//     try {
//       const bookingData = {
//         ...formData,
//         roomId: id,
//       };
//       const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
//         headers: { 'x-auth-token': token },
//       });
//       showPopup('Booking successful!');
//       setTimeout(() => {
//         navigate('/mybookings');
//       }, 1000);
//     } catch (err) {
//       showPopup(err.response.data.msg || err.response.data.error || 'Booking failed.');
//     }
//   };
  
//   if (!room) return <div className="text-center">Loading room details...</div>;

//   return (
//     <div className="container booking-container">
//       <h2 className="text-center">Book: {room.title}</h2>
//       <div className="booking-summary card">
//         <img src={room.image} alt={room.title} className="booking-image" />
//         <div className="summary-details">
//           <h3>Booking Summary</h3>
//           <p><strong>Room Type:</strong> {room.roomType}</p>
//           <p><strong>Price per night:</strong> BDT {room.price}</p>
//           <p><strong>Total Due:</strong> BDT {totalPrice}</p>
//         </div>
//       </div>
//       <form onSubmit={handleSubmit} className="booking-form card">
//         <div className="form-group">
//           <label htmlFor="userName">Full Name</label>
//           <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="userPhone">Phone Number</label>
//           <input type="tel" name="userPhone" value={formData.userPhone} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="checkInDate">Check-in Date</label>
//           <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label htmlFor="checkOutDate">Check-out Date</label>
//           <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Payment Option</label>
//           <select className="payment-select">
//             <option>Cash on arrival</option>
//             <option>bKash</option>
//             <option>Credit Card</option>
//           </select>
//         </div>
//         <button type="submit" className="btn btn-primary">Confirm Booking</button>
//       </form>
//       {isPopupVisible && (
//         <div className="popup-container">
//           <div className="popup-message">{popupMessage}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BookingForm;


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
            const flightBookingsResponse = await axios.get('http://localhost:5000/api/flight-bookings/myflights', { // New API call
                headers: { 'x-auth-token': token },
            });
            
            const allBookings = [
                ...roomBookingsResponse.data.map(b => ({ ...b, type: 'room' })),
                ...transferBookingsResponse.data.map(b => ({ ...b, type: 'transfer' })),
                ...bicycleRentalsResponse.data.map(b => ({ ...b, type: 'bicycle' })),
                ...flightBookingsResponse.data.map(b => ({ ...b, type: 'flight' })), // New flight bookings
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
                                ) : ( // New: Flight booking icon
                                    <div className="transport-icon-container">
                                        <i className="fas fa-plane"></i>
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
                                ) : ( // New: Flight booking details
                                    <>
                                        <h4 className="item-title">Flight Booking</h4>
                                        <p><strong>From:</strong> {item.from}</p>
                                        <p><strong>To:</strong> {item.to}</p>
                                        <p><strong>Departure:</strong> {new Date(item.departureDate).toLocaleDateString()}</p>
                                        {item.returnDate && <p><strong>Return:</strong> {new Date(item.returnDate).toLocaleDateString()}</p>}
                                        <p><strong>Passengers:</strong> {item.passengers}</p>
                                        <p><strong>Class:</strong> {item.bookingClass}</p>
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
            
            {isPopupVisible && (
                <div className="popup-container">
                    <div className="popup-message">{popupMessage}</div>
                </div>
            )}
        </div>
    );
};

export default MyBookings;