// client/src/pages/ManageStaff.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const ManageStaff = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchUsers = async () => {
    const token = localStorage.getItem('admin-token');
    try {
      const response = await axios.get('http://localhost:5000/api/admin/users', {
        headers: { 'x-auth-token': token },
      });
      setUsers(response.data);
    } catch (err) {
      setMessage('Failed to fetch users.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <p className="text-center">Loading users...</p>;

  return (
    <div className="container admin-list-container">
      <div className="admin-header">
        <h2>Manage Staff & Users</h2>
        <Link to="/admin/add-staff" className="btn btn-add">Add New Staff</Link>
      </div>
      
      {message && <p className="text-center message">{message}</p>}

      <div className="admin-users-grid">
        {users.map(user => (
          <div key={user._id} className="admin-user-card card">
            <div className="user-avatar">
              <i className="fas fa-user-circle"></i>
            </div>
            <div className="user-details">
              <h4>{user.username}</h4>
              <p>{user.email}</p>
              <p className={`user-role ${user.isAdmin ? 'role-admin' : 'role-user'}`}>
                {user.isAdmin ? 'Admin' : 'User'}
              </p>
            </div>
            <div className="admin-user-actions">
              <button className="btn btn-edit">Edit Role</button>
              <button className="btn btn-delete">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStaff;

