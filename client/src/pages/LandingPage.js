// client/src/pages/LandingPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; // Import the new CSS file

const LandingPage = () => {
  return (
    <div className="landing-page-container">
      <div className="landing-page-content text-center">
        <h1 className="landing-page-title">Welcome to StayHotel</h1>
        <p className="landing-page-description">
          Your journey to a perfect stay starts here. Discover, view, and book rooms with ease.
        </p>
        <Link to="/login" className="btn btn-primary">
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;