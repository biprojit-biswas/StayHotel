// client/src/pages/FlightBooking.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const FlightBooking = () => {
    const [isRoundTrip, setIsRoundTrip] = useState(true);
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departureDate: '',
        returnDate: '',
        passengers: 1,
        class: 'Economy',
    });
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const calculateFlightPrice = () => {
        let basePrice = 5000; // Base price for a one-way flight
        let classMultiplier = 1;
        if (formData.class === 'Business') classMultiplier = 2;
        if (formData.class === 'First Class') classMultiplier = 3;

        let passengersCost = formData.passengers * basePrice * classMultiplier;
        let total = passengersCost;
        if (isRoundTrip) {
            total *= 2;
        }

        return total;
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setMessage('Booking flight...');
        const token = localStorage.getItem('token');
        if (!token) {
            setMessage('You must be logged in to book a flight.');
            return;
        }

        try {
            const totalPrice = calculateFlightPrice();
            const bookingData = {
                ...formData,
                totalPrice,
                class: formData.class,
                returnDate: isRoundTrip ? formData.returnDate : null,
            };

            await axios.post('http://localhost:5000/api/flight-bookings', bookingData, {
                headers: { 'x-auth-token': token },
            });

            setMessage('Flight booked successfully! Redirecting to your bookings...');
            setTimeout(() => {
                navigate('/mybookings');
            }, 2000);
        } catch (err) {
            setMessage(err.response?.data.msg || 'Failed to book flight. Please try again.');
        }
    };

    return (
        <div className="container" style={{ paddingTop: '50px' }}>
            <div className="flight-booking-card card">
                <h2 className="text-center">Search & Book Flights</h2>
                <div className="trip-type-selector">
                    <button
                        className={`trip-btn ${isRoundTrip ? 'active' : ''}`}
                        onClick={() => setIsRoundTrip(true)}
                    >
                        Round Trip
                    </button>
                    <button
                        className={`trip-btn ${!isRoundTrip ? 'active' : ''}`}
                        onClick={() => setIsRoundTrip(false)}
                    >
                        One Way
                    </button>
                </div>
                <form onSubmit={handleSearch}>
                    <div className="form-group">
                        <label htmlFor="from">From</label>
                        <input type="text" name="from" value={formData.from} onChange={handleChange} placeholder="City or Airport" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="to">To</label>
                        <input type="text" name="to" value={formData.to} onChange={handleChange} placeholder="City or Airport" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="departureDate">Departure Date</label>
                        <input type="date" name="departureDate" value={formData.departureDate} onChange={handleChange} required />
                    </div>
                    {isRoundTrip && (
                        <div className="form-group">
                            <label htmlFor="returnDate">Return Date</label>
                            <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} required />
                        </div>
                    )}
                    <div className="form-group">
                        <label htmlFor="passengers">Passengers</label>
                        <input type="number" name="passengers" value={formData.passengers} onChange={handleChange} min="1" required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="class">Class</label>
                        <select name="class" value={formData.class} onChange={handleChange} required>
                            <option value="Economy">Economy</option>
                            <option value="Business">Business</option>
                            <option value="First Class">First Class</option>
                        </select>
                    </div>
                    <p className="text-center"><strong>Estimated Total:</strong> BDT {calculateFlightPrice()}</p>
                    <button type="submit" className="btn btn-primary search-flights-btn">Search & Book Flights</button>
                </form>
                {message && <p className="text-center message">{message}</p>}
            </div>
        </div>
    );
};

export default FlightBooking;