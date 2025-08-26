// client/src/components/TransferReviewForm.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const TransferReviewForm = ({ transferId, onReviewSubmitted }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('Please log in to submit a review.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/transfer-reviews', 
        { transferId, rating, comment }, 
        { headers: { 'x-auth-token': token } }
      );
      setMessage(response.data.msg);
      onReviewSubmitted(transferId);
    } catch (err) {
      setMessage(err.response.data.msg || 'Failed to submit review.');
    }
  };

  return (
    <div className="review-form card">
      <h4>Write a Review</h4>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Rating:</label>
          <select value={rating} onChange={(e) => setRating(e.target.value)} required>
            <option value="5">5 - Excellent</option>
            <option value="4">4 - Good</option>
            <option value="3">3 - Fair</option>
            <option value="2">2 - Poor</option>
            <option value="1">1 - Terrible</option>
          </select>
        </div>
        <div className="form-group">
          <label>Comment:</label>
          <textarea value={comment} onChange={(e) => setComment(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Submit Review</button>
      </form>
      {message && <p className="review-message">{message}</p>}
    </div>
  );
};

export default TransferReviewForm;
