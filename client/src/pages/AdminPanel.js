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
