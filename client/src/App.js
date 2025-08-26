// // // // // client/src/App.js
// // // // import React, { useState } from 'react';
// // // // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // // // import HomePage from './pages/HomePage';
// // // // import HotelInfo from './pages/HotelInfo';
// // // // import Transportation from './pages/Transportation';
// // // // import PrivateTransferForm from './pages/PrivateTransferForm';
// // // // import BicycleRentals from './pages/BicycleRentals'; // Import the new component
// // // // import Auth from './components/Auth';
// // // // import AddRoom from './components/AddRoom';
// // // // import RoomList from './components/RoomList';
// // // // import BookingForm from './components/BookingForm';
// // // // import MyBookings from './components/MyBookings';
// // // // import './App.css'; 

// // // // const PrivateRoute = ({ children }) => {
// // // //   const isAuthenticated = localStorage.getItem('token');
// // // //   return isAuthenticated ? children : <Auth />;
// // // // };

// // // // function App() {
// // // //   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

// // // //   return (
// // // //     <Router>
// // // //       <div className="main-container">
// // // //         <Routes>
// // // //           <Route path="/" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
// // // //           <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
// // // //           <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
// // // //           <Route path="/add-room" element={<PrivateRoute><AddRoom /></PrivateRoute>} />
// // // //           <Route path="/rooms" element={<RoomList />} />
// // // //           <Route path="/book/:id" element={<PrivateRoute><BookingForm /></PrivateRoute>} />
// // // //           <Route path="/mybookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
// // // //           <Route path="/hotel" element={<HotelInfo />} />
// // // //           <Route path="/transportation" element={<Transportation />} />
// // // //           <Route path="/private-transfers" element={<PrivateRoute><PrivateTransferForm /></PrivateRoute>} />
// // // //           <Route path="/bicycle-rentals" element={<PrivateRoute><BicycleRentals /></PrivateRoute>} /> {/* New route */}
// // // //         </Routes>
// // // //       </div>
// // // //     </Router>
// // // //   );
// // // // }

// // // // export default App;

// // // // client/src/App.js
// // // import React, { useState } from 'react';
// // // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // // import HomePage from './pages/HomePage';
// // // import HotelInfo from './pages/HotelInfo';
// // // import Transportation from './pages/Transportation';
// // // import PrivateTransferForm from './pages/PrivateTransferForm';
// // // import Auth from './components/Auth';
// // // import AddRoom from './components/AddRoom';
// // // import RoomList from './components/RoomList';
// // // import BookingForm from './components/BookingForm';
// // // import MyBookings from './components/MyBookings';
// // // import './App.css'; 

// // // const PrivateRoute = ({ children, setIsAuthenticated }) => {
// // //   const isAuthenticated = localStorage.getItem('token');
// // //   return isAuthenticated ? children : <Auth setIsAuthenticated={setIsAuthenticated} />;
// // // };

// // // function App() {
// // //   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

// // //   return (
// // //     <Router>
// // //       <div className="main-container">
// // //         <Routes>
// // //           <Route path="/" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
// // //           <Route path="/home" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><HomePage /></PrivateRoute>} />
// // //           <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
// // //           <Route path="/add-room" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><AddRoom /></PrivateRoute>} />
// // //           <Route path="/rooms" element={<RoomList />} />
// // //           <Route path="/book/:id" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><BookingForm /></PrivateRoute>} />
// // //           <Route path="/mybookings" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><MyBookings /></PrivateRoute>} />
// // //           <Route path="/hotel" element={<HotelInfo />} />
// // //           <Route path="/transportation" element={<Transportation />} />
// // //           <Route path="/private-transfers" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><PrivateTransferForm /></PrivateRoute>} />
// // //         </Routes>
// // //       </div>
// // //     </Router>
// // //   );
// // // }

// // // export default App;

// // // client/src/App.js
// // import React, { useState } from 'react';
// // import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// // import HomePage from './pages/HomePage';
// // import HotelInfo from './pages/HotelInfo';
// // import Transportation from './pages/Transportation';
// // import PrivateTransferForm from './pages/PrivateTransferForm';
// // import AdminDashboard from './pages/AdminDashboard';
// // import CustomerDashboard from './pages/CustomerDashboard';
// // import StaffDashboard from './pages/StaffDashboard';
// // import Auth from './components/Auth';
// // import AddRoom from './components/AddRoom';
// // import RoomList from './components/RoomList';
// // import BookingForm from './components/BookingForm';
// // import MyBookings from './components/MyBookings';
// // import './App.css'; 
// // import { jwtDecode } from 'jwt-decode';

// // const PrivateRoute = ({ children, setIsAuthenticated }) => {
// //   const token = localStorage.getItem('token');
// //   const isAuthenticated = !!token;
// //   return isAuthenticated ? children : <Auth setIsAuthenticated={setIsAuthenticated} />;
// // };

// // function App() {
// //   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

// //   // Get user role from token
// //   const token = localStorage.getItem('token');
// //   let userRole = null;
// //   if (token) {
// //     const decodedToken = jwtDecode(token);
// //     userRole = decodedToken.role;
// //   }

// //   return (
// //     <Router>
// //       <div className="main-container">
// //         <Routes>
// //           <Route path="/" element={<HomePage />} /> {/* Public home page */}
// //           <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />

// //           {/* Role-based dashboard routes */}
// //           {userRole === 'admin' && (
// //             <Route path="/dashboard" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><AdminDashboard /></PrivateRoute>} />
// //           )}
// //           {userRole === 'customer' && (
// //             <Route path="/dashboard" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><CustomerDashboard /></PrivateRoute>} />
// //           )}
// //           {userRole === 'staff' && (
// //             <Route path="/dashboard" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><StaffDashboard /></PrivateRoute>} />
// //           )}
          
// //           <Route path="/add-room" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><AddRoom /></PrivateRoute>} />
// //           <Route path="/rooms" element={<RoomList />} />
// //           <Route path="/book/:id" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><BookingForm /></PrivateRoute>} />
// //           <Route path="/mybookings" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><MyBookings /></PrivateRoute>} />
// //           <Route path="/hotel" element={<HotelInfo />} />
// //           <Route path="/transportation" element={<Transportation />} />
// //           <Route path="/private-transfers" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><PrivateTransferForm /></PrivateRoute>} />
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
// import AdminDashboard from './pages/AdminDashboard';
// import CustomerDashboard from './pages/CustomerDashboard';
// import StaffDashboard from './pages/StaffDashboard';
// import Auth from './components/Auth';
// import AddRoom from './components/AddRoom';
// import RoomList from './components/RoomList';
// import BookingForm from './components/BookingForm';
// import MyBookings from './components/MyBookings';
// import './App.css'; 
// import { jwtDecode } from 'jwt-decode';

// const PrivateRoute = ({ children, setIsAuthenticated, allowedRoles }) => {
//   const token = localStorage.getItem('token');
//   const isAuthenticated = !!token;
//   let userRole = null;
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       userRole = decodedToken.role;
//     } catch (e) {
//       console.error("Invalid token:", e);
//       localStorage.removeItem('token');
//     }
//   }

//   if (!isAuthenticated) {
//     return <Auth setIsAuthenticated={setIsAuthenticated} />;
//   }

//   if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
//     return <h1>Access Denied</h1>;
//   }
  
//   return children;
// };

// const DashboardRedirect = ({ setIsAuthenticated }) => {
//   const token = localStorage.getItem('token');
//   let userRole = null;
//   if (token) {
//     try {
//       const decodedToken = jwtDecode(token);
//       userRole = decodedToken.role;
//     } catch (e) {
//       console.error("Invalid token:", e);
//       localStorage.removeItem('token');
//       return <Auth setIsAuthenticated={setIsAuthenticated} />;
//     }
//   }

//   if (userRole === 'admin') {
//     return <Navigate to="/admin/dashboard" />;
//   } else if (userRole === 'customer') {
//     return <Navigate to="/customer/dashboard" />;
//   } else if (userRole === 'staff') {
//     return <Navigate to="/staff/dashboard" />;
//   } else {
//     return <HomePage />;
//   }
// };

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

//   return (
//     <Router>
//       <div className="main-container">
//         <Routes>
//           <Route path="/" element={<HomePage />} />
//           <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
//           <Route path="/home" element={<DashboardRedirect setIsAuthenticated={setIsAuthenticated} />} />
          
//           <Route path="/admin/dashboard" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
//           <Route path="/customer/dashboard" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} allowedRoles={['customer']}><CustomerDashboard /></PrivateRoute>} />
//           <Route path="/staff/dashboard" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} allowedRoles={['staff']}><StaffDashboard /></PrivateRoute>} />
          
//           <Route path="/add-room" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} allowedRoles={['admin']}><AddRoom /></PrivateRoute>} />
//           <Route path="/rooms" element={<RoomList />} />
//           <Route path="/book/:id" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><BookingForm /></PrivateRoute>} />
//           <Route path="/mybookings" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} allowedRoles={['customer']}><MyBookings /></PrivateRoute>} />
//           <Route path="/hotel" element={<HotelInfo />} />
//           <Route path="/transportation" element={<Transportation />} />
//           <Route path="/private-transfers" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><PrivateTransferForm /></PrivateRoute>} />
//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;

// client/src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import HotelInfo from './pages/HotelInfo';
import Transportation from './pages/Transportation';
import PrivateTransferForm from './pages/PrivateTransferForm';
import AdminDashboard from './pages/AdminDashboard';
import StaffDashboard from './pages/StaffDashboard';
import Auth from './components/Auth';
import AddRoom from './components/AddRoom';
import RoomList from './components/RoomList';
import BookingForm from './components/BookingForm';
import MyBookings from './components/MyBookings';
import './App.css'; 
import { jwtDecode } from 'jwt-decode';

const PrivateRoute = ({ children, setIsAuthenticated, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = !!token;
  let userRole = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role;
    } catch (e) {
      console.error("Invalid token:", e);
      localStorage.removeItem('token');
    }
  }

  if (!isAuthenticated) {
    return <Auth setIsAuthenticated={setIsAuthenticated} />;
  }

  if (allowedRoles && userRole && !allowedRoles.includes(userRole)) {
    return <h1>Access Denied</h1>;
  }
  
  return children;
};

const DashboardRedirect = ({ setIsAuthenticated }) => {
  const token = localStorage.getItem('token');
  let userRole = null;
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role;
    } catch (e) {
      console.error("Invalid token:", e);
      localStorage.removeItem('token');
      return <Auth setIsAuthenticated={setIsAuthenticated} />;
    }
  }

  if (userRole === 'admin') {
    return <Navigate to="/admin/dashboard" />;
  } else if (userRole === 'customer') {
    return <Navigate to="/" />; // Redirect customers to the public homepage
  } else if (userRole === 'staff') {
    return <Navigate to="/staff/dashboard" />;
  } else {
    return <HomePage />;
  }
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  return (
    <Router>
      <div className="main-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<Auth setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/home" element={<DashboardRedirect setIsAuthenticated={setIsAuthenticated} />} />
          
          <Route path="/admin/dashboard" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} allowedRoles={['admin']}><AdminDashboard /></PrivateRoute>} />
          <Route path="/staff/dashboard" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} allowedRoles={['staff']}><StaffDashboard /></PrivateRoute>} />
          
          <Route path="/add-room" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} allowedRoles={['admin']}><AddRoom /></PrivateRoute>} />
          <Route path="/rooms" element={<RoomList />} />
          <Route path="/book/:id" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><BookingForm /></PrivateRoute>} />
          <Route path="/mybookings" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated} allowedRoles={['customer']}><MyBookings /></PrivateRoute>} />
          <Route path="/hotel" element={<HotelInfo />} />
          <Route path="/transportation" element={<Transportation />} />
          <Route path="/private-transfers" element={<PrivateRoute setIsAuthenticated={setIsAuthenticated}><PrivateTransferForm /></PrivateRoute>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;