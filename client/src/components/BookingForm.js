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
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);

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

  const calculateTotalPrice = () => {
    const checkIn = new Date(formData.checkInDate);
    const checkOut = new Date(formData.checkOutDate);
    if (checkIn && checkOut && room) {
      const oneDay = 24 * 60 * 60 * 1000;
      const nights = Math.round(Math.abs((checkOut - checkIn) / oneDay));
      setTotalPrice(nights * room.price);
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [formData, room]);

  const showPopup = (message) => {
    setPopupMessage(message);
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      showPopup('You must be logged in to book a room.');
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
      showPopup('Booking successful!');
      setTimeout(() => {
        navigate('/mybookings');
      }, 1000);
    } catch (err) {
      showPopup(err.response.data.msg || err.response.data.error || 'Booking failed.');
    }
  };
  
  if (!room) return <div className="text-center">Loading room details...</div>;

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
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup-message">{popupMessage}</div>
        </div>
      )}
    </div>
  );
};

export default BookingForm;