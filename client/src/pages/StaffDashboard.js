// // client/src/pages/StaffDashboard.js
// import React from 'react';
// import '../App.css';

// const StaffDashboard = () => {
//   return (
//     <div className="container dashboard-container">
//       <h1 className="dashboard-title">Staff Dashboard</h1>
//       <p className="dashboard-subtitle">Welcome back. Here is your daily overview.</p>
//       <div className="dashboard-actions">
//         <div className="dashboard-card card">
//           <i className="fas fa-door-open"></i>
//           <h3>Today's Check-ins</h3>
//           <p>View guests arriving today.</p>
//         </div>
//         <div className="dashboard-card card">
//           <i className="fas fa-door-closed"></i>
//           <h3>Today's Check-outs</h3>
//           <p>View guests departing today.</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// // export default StaffDashboard;

// client/src/pages/StaffDashboard.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../App.css';

const StaffDashboard = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="container dashboard-container">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Staff Dashboard</h1>
        <button onClick={handleSignOut} className="btn-sign-out">Sign Out</button>
      </div>
      <p className="dashboard-subtitle">Welcome back. Here is your daily overview.</p>
      <div className="dashboard-actions">
        <div className="dashboard-card card">
          <i className="fas fa-door-open"></i>
          <h3>Today's Check-ins</h3>
          <p>View guests arriving today.</p>
        </div>
        <div className="dashboard-card card">
          <i className="fas fa-door-closed"></i>
          <h3>Today's Check-outs</h3>
          <p>View guests departing today.</p>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;