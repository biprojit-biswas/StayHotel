// client/src/pages/HotelInfo.js
import React from 'react';
import '../App.css';

const HotelInfo = () => {
  return (
    <div className="hotel-info-container">
      <div className="hotel-header-section">
        <h1 className="hotel-title">The StayHotel Experience</h1>
        <p className="hotel-tagline">Where comfort meets luxury.</p>
      </div>

      <div className="hotel-content-section card">
        <h2 className="section-title">Our Story</h2>
        <p className="section-text">
          Established in 2025, StayHotel was founded on the principle of providing an unparalleled guest experience. We started with a vision to create a peaceful sanctuary for travelers, combining modern amenities with timeless hospitality. Over the years, we have grown to become a beloved destination for those seeking comfort, quality, and a memorable stay.
        </p>
      </div>

      <div className="hotel-content-section card">
        <h2 className="section-title">Key Facts</h2>
        <ul className="facts-list">
          <li><strong>Established:</strong> 2025</li>
          <li><strong>Motto:</strong> Your Stay, Our Passion</li>
          <li><strong>Architect:</strong> Local Design Collective</li>
          <li><strong>Awards:</strong> Rated "Excellent" for Customer Service (2025)</li>
        </ul>
      </div>

      <div className="hotel-content-section card">
        <h2 className="section-title">Contact Information</h2>
        <div className="contact-details">
          <div className="contact-item">
            <h4 className="contact-label">Customer Care</h4>
            <p className="contact-info">+880 123 456 7890</p>
          </div>
          <div className="contact-item">
            <h4 className="contact-label">Reception</h4>
            <p className="contact-info">+880 123 456 7891</p>
          </div>
          <div className="contact-item">
            <h4 className="contact-label">General Inquiry</h4>
            <p className="contact-info">info@stayhotel.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelInfo;