// client/src/pages/ViewFeedback.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const ViewFeedback = () => {
  const [reviews, setReviews] = useState({ roomReviews: [], transferReviews: [] });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchReviews = async () => {
    const token = localStorage.getItem('admin-token');
    try {
      const response = await axios.get('http://localhost:5000/api/admin/reviews', {
        headers: { 'x-auth-token': token },
      });
      setReviews(response.data);
    } catch (err) {
      setMessage('Failed to fetch reviews.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) return <p className="text-center">Loading reviews...</p>;

  return (
    <div className="container admin-list-container">
      <h2 className="admin-title">Customer Feedback</h2>
      
      {message && <p className="text-center message">{message}</p>}

      <div className="reviews-section">
        <h3>Room Reviews</h3>
        {reviews.roomReviews.length > 0 ? (
          reviews.roomReviews.map(review => (
            <div key={review._id} className="review-card card">
              <p><strong>User:</strong> {review.userId.username}</p>
              <p><strong>Room:</strong> {review.roomId.title}</p>
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p><strong>Comment:</strong> "{review.comment}"</p>
            </div>
          ))
        ) : (
          <p>No room reviews available.</p>
        )}
      </div>

      <div className="reviews-section">
        <h3>Transfer Reviews</h3>
        {reviews.transferReviews.length > 0 ? (
          reviews.transferReviews.map(review => (
            <div key={review._id} className="review-card card">
              <p><strong>User:</strong> {review.userId.username}</p>
              <p><strong>Rating:</strong> {review.rating}/5</p>
              <p><strong>Comment:</strong> "{review.comment}"</p>
            </div>
          ))
        ) : (
          <p>No transfer reviews available.</p>
        )}
      </div>
    </div>
  );
};

export default ViewFeedback;

