// client/src/components/BookingForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';

const BookingForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [room, setRoom] = useState(null);
  const [formData, setFormData] = useState({
    userName: '',
    userPhone: '',
    checkInDate: '',
    checkOutDate: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');

  // Fetch room details for the booking form
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/rooms/${id}`);
        setRoom(response.data);
      } catch (err) {
        console.error('Error fetching room details:', err);
      }
    };
    fetchRoomDetails();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Calculate total price based on dates and room price
  const calculateTotalPrice = () => {
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    
    // Ensure both dates and room price are available
    if (checkIn && checkOut && room) {
      const oneDay = 24 * 60 * 60 * 1000;
      const totalNights = Math.round(Math.abs((checkOut - checkIn) / oneDay));
      const calculatedPrice = totalNights > 0 ? totalNights * room.price : 0;
      setTotalPrice(calculatedPrice);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [formData.checkInDate, formData.checkOutDate, room]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to book a room.');
      return;
    }
    
    try {
      const bookingData = {
        ...formData,
        roomId: id,
      };
      
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData, {
        headers: { 'x-auth-token': token },
      });
      setMessage(response.data.msg);
      // Redirect to the My Bookings page on successful booking
      setTimeout(() => {
        navigate('/mybookings');
      }, 2000);
    } catch (err) {
      setMessage(err.response?.data.msg || 'Booking failed.');
    }
  };
  
  if (!room) return <div className="text-center loading-message">Loading room details...</div>;

  return (
    <div className="container booking-container">
      <h2 className="text-center">Book: {room.title}</h2>
      <div className="booking-summary card">
        <img src={room.image} alt={room.title} className="booking-image" />
        <div className="summary-details">
          <h3>Booking Summary</h3>
          <p><strong>Room Type:</strong> {room.roomType}</p>
          <p><strong>Price per night:</strong> BDT {room.price}</p>
          <p><strong>Total Due:</strong> BDT {totalPrice}</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="booking-form card">
        <div className="form-group">
          <label htmlFor="userName">Full Name</label>
          <input type="text" name="userName" value={formData.userName} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="userPhone">Phone Number</label>
          <input type="tel" name="userPhone" value={formData.userPhone} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="checkInDate">Check-in Date</label>
          <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="checkOutDate">Check-out Date</label>
          <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Payment Option</label>
          <select className="payment-select">
            <option>Cash on arrival</option>
            <option>bKash</option>
            <option>Credit Card</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Confirm Booking</button>
      </form>
      {message && <p className="text-center message">{message}</p>}
    </div>
  );
};

export default BookingForm;