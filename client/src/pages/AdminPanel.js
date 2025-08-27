// client/src/pages/AdminPanel.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const AdminPanel = () => {
  const [reviews, setReviews] = useState({ roomReviews: [], transferReviews: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      const token = localStorage.getItem('admin-token');
      if (!token) {
        setError('Not authorized. Please log in as an admin.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:5000/api/admin/reviews', {
          headers: { 'x-auth-token': token },
        });
        setReviews(response.data);
      } catch (err) {
        setError(err.response?.data.msg || 'Failed to fetch reviews.');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  if (loading) return <div className="text-center loading-message">Loading admin panel...</div>;
  if (error) return <div className="text-center error-message">{error}</div>;

  return (
    <div className="container admin-panel-container">
      <h2 className="admin-panel-title">Admin Panel</h2>
      <div className="admin-content-grid">
        <div className="admin-card card">
          <h3 className="admin-card-title">Room Reviews</h3>
          {reviews.roomReviews.length > 0 ? (
            reviews.roomReviews.map(review => (
              <div key={review._id} className="admin-review-item">
                <p><strong>Room:</strong> {review.roomId?.title}</p>
                <p><strong>User:</strong> {review.userId?.username}</p>
                <p><strong>Rating:</strong> {review.rating}/5</p>
                <p><strong>Comment:</strong> "{review.comment}"</p>
              </div>
            ))
          ) : <p>No room reviews found.</p>}
        </div>
        <div className="admin-card card">
          <h3 className="admin-card-title">Transfer Reviews</h3>
          {reviews.transferReviews.length > 0 ? (
            reviews.transferReviews.map(review => (
              <div key={review._id} className="admin-review-item">
                <p><strong>Transfer:</strong> {review.transferId?.transferType}</p>
                <p><strong>User:</strong> {review.userId?.username}</p>
                <p><strong>Rating:</strong> {review.rating}/5</p>
                <p><strong>Comment:</strong> "{review.comment}"</p>
              </div>
            ))
          ) : <p>No transfer reviews found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;


// // client/src/pages/AdminPanel.js
// import React from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import '../App.css';

// const AdminPanel = () => {
//     const navigate = useNavigate();

//     const handleSignOut = () => {
//         // Remove the admin's token from local storage
//         localStorage.removeItem('admin-token');
//         // Redirect the user to the admin login page
//         navigate('/admin/login');
//     };

//     return (
//         <div className="container admin-panel-container">
//             <div className="admin-panel-header">
//                 <h2 className="admin-panel-title">Admin Dashboard</h2>
//                 <button className="btn-sign-out" onClick={handleSignOut}>Sign Out</button>
//             </div>
//             <p className="admin-panel-tagline">Welcome back, Admin. Manage the hotel from here.</p>
//             <div className="admin-content-grid">
//                 <Link to="/add-room" className="admin-dashboard-card card">
//                     <div className="admin-card-icon">
//                         <i className="fas fa-plus-circle"></i>
//                     </div>
//                     <h3 className="admin-card-title">Add New Room</h3>
//                     <p className="admin-card-text">Create and add new room listings to the website.</p>
//                 </Link>
//                 <div className="admin-dashboard-card card">
//                     <div className="admin-card-icon">
//                         <i className="fas fa-list-alt"></i>
//                     </div>
//                     <h3 className="admin-card-title">View All Bookings</h3>
//                     <p className="admin-card-text">See all room and transportation bookings.</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default AdminPanel;