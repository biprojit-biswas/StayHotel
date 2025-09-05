// client/src/pages/AdminDashboard.js
import React from 'react';
import '../App.css';

const AdminDashboard = () => {
  return (
    <div className="container" style={{ paddingTop: '50px' }}>
      <h1 className="text-center" style={{ color: 'var(--primary-color)' }}>Admin Dashboard</h1>
      <p className="text-center">Welcome, Admin. Here you can manage all aspects of the hotel.</p>
    </div>
  );
};

export default AdminDashboard;