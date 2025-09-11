// // // client/src/App.js
// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import HomePage from './pages/HomePage';
// // import HotelInfo from './pages/HotelInfo';
// // import Transportation from './pages/Transportation';
// // import PrivateTransferForm from './pages/PrivateTransferForm';
// // import BicycleRentals from './pages/BicycleRentals';
// // import FlightBooking from './pages/FlightBooking';
// // import Auth from './components/Auth';
// // import AddRoom from './components/AddRoom';
// // import RoomList from './components/RoomList';
// // import BookingForm from './components/BookingForm';
// // import MyBookings from './components/MyBookings';
// // import AdminDashboard from './pages/AdminDashboard';
// // import StaffDashboard from './pages/StaffDashboard';
// // import './App.css';

// // function App() {
// //   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

// //   const ProtectedRoute = ({ children, requiredRole }) => {
// //     const isAuthenticated = localStorage.getItem('token');
// //     const userRole = localStorage.getItem('userRole');
    
// //     if (!isAuthenticated) {
// //       return <Navigate to="/auth" replace />;
// //     }

// //     if (requiredRole && userRole !== requiredRole) {
// //       return <Navigate to="/home" replace />;
// //     }

// //     return children;
// //   };

// //   return (
// //     <Router>
// //       <div className="main-container">
// //         <Routes>
// //           <Route path="/" element={isAuthenticated ? <HomePage /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
          
// //           <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
// //           <Route path="/add-room" element={<ProtectedRoute requiredRole="admin"><AddRoom /></ProtectedRoute>} />
// //           <Route path="/book/:id" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
// //           <Route path="/mybookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
// //           <Route path="/private-transfers" element={<ProtectedRoute><PrivateTransferForm /></ProtectedRoute>} />
// //           <Route path="/bicycle-rentals" element={<ProtectedRoute><BicycleRentals /></ProtectedRoute>} />
// //           <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
// //           <Route path="/staff" element={<ProtectedRoute requiredRole="staff"><StaffDashboard /></ProtectedRoute>} />
          
// //           <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
// //           <Route path="/hotel" element={<HotelInfo />} />
// //           <Route path="/rooms" element={<RoomList />} />
// //           <Route path="/transportation" element={<Transportation />} />
// //           <Route path="/flights" element={<FlightBooking />} /> {/* New public route */}
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // }

// // export default App;


// // client/src/App.js
// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import HomePage from './pages/HomePage';
// import HotelInfo from './pages/HotelInfo';
// import Transportation from './pages/Transportation';
// import PrivateTransferForm from './pages/PrivateTransferForm';
// import BicycleRentals from './pages/BicycleRentals';
// import FlightBooking from './pages/FlightBooking';
// import Auth from './components/Auth';
// import AddRoom from './components/AddRoom';
// import RoomList from './components/RoomList';
// import BookingForm from './components/BookingForm';
// import MyBookings from './components/MyBookings';
// import AdminDashboard from './pages/AdminDashboard';
// import StaffDashboard from './pages/StaffDashboard';
// import './App.css';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//   const ProtectedRoute = ({ children, requiredRole }) => {
//     const isAuthenticated = localStorage.getItem('token');
//     const userRole = localStorage.getItem('userRole');
    
//     if (!isAuthenticated) {
//       return <Navigate to="/auth" replace />;
//     }

//     if (requiredRole && userRole !== requiredRole) {
//       return <Navigate to="/home" replace />;
//     }

//     return children;
//   };

//   return (
//     <Router>
//       <div className="main-container">
//         <Routes>
//           <Route path="/" element={isAuthenticated ? <HomePage /> : <Auth setIsAuthenticated={setIsAuthenticated} />} />
          
//           <Route path="/home" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
//           <Route path="/add-room" element={<ProtectedRoute requiredRole="admin"><AddRoom /></ProtectedRoute>} />
//           <Route path="/book/:id" element={<ProtectedRoute><BookingForm /></ProtectedRoute>} />
//           <Route path="/mybookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
//           <Route path="/private-transfers" element={<ProtectedRoute><PrivateTransferForm /></ProtectedRoute>} />
//           <Route path="/bicycle-rentals" element={<ProtectedRoute><BicycleRentals /></ProtectedRoute>} />
//           <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminDashboard /></ProtectedRoute>} />
//           <Route path="/staff" element={<ProtectedRoute requiredRole="staff"><StaffDashboard /></ProtectedRoute>} />
          
//           <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
//           <Route path="/hotel" element={<HotelInfo />} />
//           <Route path="/rooms" element={<RoomList />} />
//           <Route path="/transportation" element={<Transportation />} />
//           <Route path="/flights" element={<FlightBooking />} /> {/* New public route */}
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;













// import React, { useState } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminPanel from './pages/AdminPanel';
// import AdminDashboard from './pages/AdminDashboard';
// import './App.css';

// function App() {
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [rooms, setRooms] = useState([]);
//   const [feedback, setFeedback] = useState([]);
//   const [staffAndUsers, setStaffAndUsers] = useState([]);

//   return (
//     <Router>
//       <div className="main-container">
//         <Routes>
//           <Route 
//             path="/" 
//             element={
//               <AdminPanel 
//                 currentView={currentView}
//                 setCurrentView={setCurrentView}
//                 rooms={rooms}
//                 setRooms={setRooms}
//                 feedback={feedback}
//                 setFeedback={setFeedback}
//                 staffAndUsers={staffAndUsers}
//                 setStaffAndUsers={setStaffAndUsers}
//               />
//             } 
//           />
//           <Route path="/dashboard" element={<AdminDashboard />} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;


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
import AdminPanel from './pages/AdminPanel'; 
import './App.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  const ProtectedRoute = ({ children, requiredRole }) => {
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
          <Route path="/admin" element={<ProtectedRoute requiredRole="admin"><AdminPanel handleLogout={handleLogout} /></ProtectedRoute>} />
          <Route path="/staff" element={<ProtectedRoute requiredRole="staff"><StaffDashboard /></ProtectedRoute>} />
          
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/hotel" element={<HotelInfo />} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/transportation" element={<Transportation />} />
          <Route path="/flights" element={<FlightBooking />} />
          <Route path="/admindashboard" element={<ProtectedRoute requiredRole="admin"><AdminDashboard handleLogout={handleLogout} /></ProtectedRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;