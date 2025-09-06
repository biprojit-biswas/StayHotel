// client/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelInfo from './pages/HotelInfo';
import Transportation from './pages/Transportation';
import PrivateTransferForm from './pages/PrivateTransferForm';
import BicycleRentals from './pages/BicycleRentals';
import FlightBooking from './pages/FlightBooking';
import Auth from './components/Auth';
import AddRoom from './components/AddRoom';
import RoomList from './components/RoomList';
import BookingForm from './components/BookingForm';
import MyBookings from './components/MyBookings';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const ProtectedRoute = ({ children, requiredRole }) => {
    const isAuthenticated = localStorage.getItem('token');
    const userRole = localStorage.getItem('userRole');
    
    if (!isAuthenticated) {
      return <Navigate to="/auth" replace />;
    }

    if (requiredRole && userRole !== requiredRole) {
      return <Navigate to="/home" replace />;
    }

    return children;
  };

  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={isAuthenticated ? <HomePage /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
          
          <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
          <Route path="/add-room" element={<ProtectedRoute requiredRole="admin"><AddRoom /></ProtectedRoute>} />
          <Route path="/book/:id" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
          <Route path="/mybookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
          <Route path="/private-transfers" element={<ProtectedRoute><PrivateTransferForm /></ProtectedRoute>} />
          <Route path="/bicycle-rentals" element={<ProtectedRoute><BicycleRentals /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute requiredRole="staff"><StaffDashboard /></ProtectedRoute>} />
          
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/hotel" element={<HotelInfo />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/transportation" element={<Transportation />} />
          <Route path="/flights" element={<FlightBooking />} /> {/* New public route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;