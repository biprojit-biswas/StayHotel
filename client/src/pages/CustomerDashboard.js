// client/src/pages/CustomerDashboard.js
import React from 'react';
import { Link } from 'react-router-dom';
import MyBookings from '../components/MyBookings';
import '../App.css';

const CustomerDashboard = () => {
  return (
    <div className="container dashboard-container">
      <MyBookings />
    </div>
  );
};

export default CustomerDashboard;