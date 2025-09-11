// client/src/components/AddStaff.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddStaff = () => {
  const [formData, setFormData] = useState({ username: '', email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAddStaff = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin-token');
    if (!token) {
      setMessage('You must be logged in as admin to add staff.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/admin/staff/add', formData, {
        headers: { 'x-auth-token': token },
      });
      setMessage(response.data.msg);
    } catch (err) {
      setMessage(err.response?.data.msg || 'Failed to add staff.');
    }
  };

  return (
    <div className="container form-container">
      <h2 className="text-center">Add New Staff</h2>
      <form onSubmit={handleAddStaff} className="card">
        <div className="form-group">
          <label>Username</label>
          <input type="text" name="username" value={formData.username} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Add Staff</button>
      </form>
      {message && <p className="text-center message">{message}</p>}
    </div>
  );
};

export default AddStaff;