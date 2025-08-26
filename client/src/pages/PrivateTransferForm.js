// client/src/pages/PrivateTransferForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const PrivateTransferForm = () => {
  const [formData, setFormData] = useState({
    transferType: 'Taxi',
    arrivalDate: '',
    arrivalTime: '',
    isRoundTrip: false,
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const calculatePrice = () => {
    let basePrice = 0;
    if (formData.transferType === 'Taxi') {
      basePrice = 500;
    } else if (formData.transferType === 'Luxury Car') {
      basePrice = 2000;
    }

    if (formData.isRoundTrip) {
      basePrice *= 1.8;
    }

    setTotalPrice(basePrice);
  };

  useEffect(() => {
    calculatePrice();
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to book a transfer.');
      return;
    }
    
    try {
      const bookingData = {
        ...formData,
        totalPrice: totalPrice,
      };
      
      const response = await axios.post('http://localhost:5000/api/private-transfers', bookingData, {
        headers: { 'x-auth-token': token },
      });
      setMessage(response.data.msg);
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      setMessage(err.response?.data.msg || 'Failed to book transfer.');
    }
  };

  return (
    <div className="transfer-page-container">
      <div className="transfer-form-card card">
        <h2 className="text-center">Book a Private Transfer</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="arrivalDate">Arrival Date</label>
            <input type="date" name="arrivalDate" value={formData.arrivalDate} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="arrivalTime">Arrival Time</label>
            <input type="time" name="arrivalTime" value={formData.arrivalTime} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Transfer Type</label>
            <div className="transfer-options">
              <label>
                <input type="radio" name="transferType" value="Taxi" checked={formData.transferType === 'Taxi'} onChange={handleInputChange} />
                Taxi
              </label>
              <label>
                <input type="radio" name="transferType" value="Luxury Car" checked={formData.transferType === 'Luxury Car'} onChange={handleInputChange} />
                Luxury Car
              </label>
            </div>
          </div>
          <div className="form-group">
            <label>
              <input type="checkbox" name="isRoundTrip" checked={formData.isRoundTrip} onChange={handleInputChange} />
              Round Trip
            </label>
          </div>
          
          <div className="price-display">
            <p><strong>Total Due:</strong> BDT {totalPrice}</p>
          </div>

          <button type="submit" className="btn btn-primary">Confirm Transfer</button>
        </form>
        {message && <p className="text-center" style={{ marginTop: '20px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default PrivateTransferForm;