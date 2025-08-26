// client/src/pages/AdminDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const AdminDashboard = () => {
  return (
    <div className="container dashboard-container">
      <h1 className="dashboard-title">Admin Dashboard</h1>
      <p className="dashboard-subtitle">Welcome back, Admin. Manage the hotel from here.</p>
      <div className="dashboard-actions">
        <Link to="/add-room" className="dashboard-link card">
          <i className="fas fa-plus-circle"></i>
          <h3>Add New Room</h3>
          <p>Create and add new room listings to the website.</p>
        </Link>
        <Link to="/bookings" className="dashboard-link card">
          <i className="fas fa-list-alt"></i>
          <h3>View All Bookings</h3>
          <p>See all room and transportation bookings.</p>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;