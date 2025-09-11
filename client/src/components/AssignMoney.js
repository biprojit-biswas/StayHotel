// client/src/components/AssignMoney.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AssignMoney = () => {
  const [formData, setFormData] = useState({ userId: '', amount: '' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAssignFunds = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin-token');
    if (!token) {
      setMessage('You must be logged in as admin to assign funds.');
      return;
    }
    
    try {
      const response = await axios.post('http://localhost:5000/api/admin/client/assign-funds', formData, {
        headers: { 'x-auth-token': token },
      });
      setMessage(response.data.msg);
    } catch (err) {
      setMessage(err.response?.data.msg || 'Failed to assign funds.');
    }
  };

  return (
    <div className="container form-container">
      <h2 className="text-center">Assign Funds to Client</h2>
      <form onSubmit={handleAssignFunds} className="card">
        <div className="form-group">
          <label>Client User ID</label>
          <input type="text" name="userId" value={formData.userId} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Amount (BDT)</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Assign Funds</button>
      </form>
      {message && <p className="text-center message">{message}</p>}
    </div>
  );
};

export default AssignMoney;