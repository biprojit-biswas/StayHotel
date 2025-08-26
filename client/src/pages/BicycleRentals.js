// client/src/pages/BicycleRentals.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const BicycleRentals = () => {
  const [formData, setFormData] = useState({
    bicycleType: 'City Bike',
    rentalDate: '',
    rentalDuration: 1, // Default to 1 hour
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const bicycleOptions = [
    { type: 'City Bike', pricePerHour: 100, image: 'https://images.unsplash.com/photo-1571212470725-d72b535d5568?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { type: 'Mountain Bike', pricePerHour: 150, image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
    { type: 'Electric Bike', pricePerHour: 250, image: 'https://images.unsplash.com/photo-1627857218337-33f78e47b311?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculatePrice = () => {
    const selectedBike = bicycleOptions.find(bike => bike.type === formData.bicycleType);
    if (selectedBike && formData.rentalDuration > 0) {
      setTotalPrice(selectedBike.pricePerHour * formData.rentalDuration);
    } else {
      setTotalPrice(0);
    }
  };

  useEffect(() => {
    calculatePrice();
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to book a bicycle.');
      return;
    }
    
    try {
      const rentalData = {
        ...formData,
        totalPrice: totalPrice,
        rentalDuration: Number(formData.rentalDuration),
      };
      
      const response = await axios.post('http://localhost:5000/api/bicycle-rentals', rentalData, {
        headers: { 'x-auth-token': token },
      });
      setMessage(response.data.msg);
      setTimeout(() => navigate('/home'), 2000);
    } catch (err) {
      setMessage(err.response?.data.msg || 'Failed to book bicycle.');
    }
  };

  return (
    <div className="rental-page-container">
      <div className="rental-form-card card">
        <h2 className="text-center">Book a Bicycle Rental</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="rentalDate">Rental Date</label>
            <input type="date" name="rentalDate" value={formData.rentalDate} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="rentalDuration">Rental Duration (hours)</label>
            <input type="number" name="rentalDuration" value={formData.rentalDuration} onChange={handleInputChange} min="1" required />
          </div>
          <div className="form-group">
            <label>Bicycle Type</label>
            <div className="bicycle-options-grid">
              {bicycleOptions.map(bike => (
                <label key={bike.type} className="bicycle-option-card">
                  <input 
                    type="radio" 
                    name="bicycleType" 
                    value={bike.type} 
                    checked={formData.bicycleType === bike.type} 
                    onChange={handleInputChange} 
                    style={{ display: 'none' }} // Hide default radio button
                  />
                  <div className="bicycle-card-content">
                    <img src={bike.image} alt={bike.type} className="bicycle-image" />
                    <span className="bicycle-type-name">{bike.type}</span>
                    <span className="bicycle-price">BDT {bike.pricePerHour}/hour</span>
                  </div>
                </label>
              ))}
            </div>
          </div>
          
          <div className="price-display">
            <p><strong>Total Due:</strong> BDT {totalPrice}</p>
          </div>

          <button type="submit" className="btn btn-primary">Confirm Rental</button>
        </form>
        {message && <p className="text-center" style={{ marginTop: '20px' }}>{message}</p>}
      </div>
    </div>
  );
};

export default BicycleRentals;