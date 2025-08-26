// client/src/pages/Transportation.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Transportation = () => {
  return (
    <div className="transportation-container">
      <div className="transportation-header">
        <h1>Hotel Transportation Services</h1>
        <p>Your comfort and convenience are our priority. Explore our transport options to make your stay seamless.</p>
      </div>

      <div className="transportation-grid">
        <Link to="/private-transfers" className="transport-card card">
          <div className="transport-icon">
            <i className="fas fa-car-side"></i>
          </div>
          <div className="transport-info">
            <h3 className="transport-title">Private Transfers</h3>
            <p className="transport-description">For a more personalized experience, arrange a luxury car or taxi for private transfers. Our front desk staff is available 24/7 to assist you.</p>
          </div>
          <button className="transport-action-btn">Book Now</button>
        </Link>

        <Link to="/bicycle-rentals" className="transport-card card">
          <div className="transport-icon">
            <i className="fas fa-bicycle"></i>
          </div>
          <div className="transport-info">
            <h3 className="transport-title">Bicycle Rentals</h3>
            <p className="transport-description">Explore the city at your own pace! We offer a selection of bicycles for rent, perfect for a leisurely ride along the coast or through the park.</p>
          </div>
          <button className="transport-action-btn">Rent Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Transportation;