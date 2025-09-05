// client/src/components/MyBookings.js
import React, { useState, useEffect, useCallback } from 'react';
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

    // Correctly wrapping fetchMyBookings in useCallback
    const fetchMyBookings = useCallback(async () => {
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
    }, []); // Empty dependency array as fetchMyBookings doesn't depend on any other state

    useEffect(() => {
        fetchMyBookings();
    }, [fetchMyBookings]); // Correctly including fetchMyBookings as a dependency

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
            
            {loading ? ( // Correctly using the loading state
                <div className="text-center loading-message">Loading your bookings...</div>
            ) : error ? ( // Correctly using the error state
                <div className="text-center error-message">{error}</div>
            ) : bookings.length > 0 ? (
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
                                ) : (
                                    <>
                                        <h4 className="item-title">Flight Booking</h4>
                                        <p><strong>From:</strong> {item.from} to {item.to}</p>
                                        <p><strong>Depart:</strong> {new Date(item.departureDate).toLocaleDateString()}</p>
                                        {item.returnDate && <p><strong>Return:</strong> {new Date(item.returnDate).toLocaleDateString()}</p>}
                                        <p><strong>Passengers:</strong> {item.passengers}</p>
                                        <p><strong>Class:</strong> {item.class}</p>
                                        <p className="item-price">BDT {item.totalPrice}</p>
                                    </>
                                )}
                            </div>

                            {/* ... (reviews section remains the same) */}
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