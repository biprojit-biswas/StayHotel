// client/src/pages/StaffDashboard.js
import React from 'react';
import '../App.css';

const StaffDashboard = () => {
  return (
    <div className="container" style={{ paddingTop: '50px' }}>
      <h1 className="text-center" style={{ color: 'var(--secondary-color)' }}>Staff Dashboard</h1>
      <p className="text-center">Welcome, Staff. Here you can view and manage daily tasks and bookings.</p>
    </div>
  );
};

export default StaffDashboard;