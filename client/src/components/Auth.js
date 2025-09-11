// client/src/components/Auth.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const Auth = ({ setIsAuthenticated }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [popupMessage, setPopupMessage] = useState('');
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setIsPopupVisible(true);
    setTimeout(() => {
      setIsPopupVisible(false);
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
    try {
      const response = await axios.post(url, formData);
      console.log('Success:', response.data);
      if (isLogin) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.user.role);
        setIsAuthenticated(true);
        showPopup('Login successful!');
        
        // Redirect based on the user's role
        if (response.data.user.role === 'admin') {
          setTimeout(() => navigate('/admin'), 1000);
        } else if (response.data.user.role === 'staff') {
          setTimeout(() => navigate('/staff'), 1000);
        } else {
          setTimeout(() => navigate('/home'), 1000);
        }
      } else {
        showPopup('Registration successful! Please log in.');
        setIsLogin(true);
      }
    } catch (err) {
      console.error('Error:', err);
      if (err.response) {
        showPopup('Error: ' + (err.response.data.error || err.response.data.msg));
      } else {
        showPopup('Error: Could not connect to the server.');
      }
    }
  };

  return (
    <div className="container card">
      <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div className="form-group">
            <label>Username</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} required />
          </div>
        )}
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>
      <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
        {isLogin ? 'Need to create an account? Register' : 'Already have an account? Login'}
      </button>
      {isPopupVisible && (
        <div className="popup-container">
          <div className="popup-message">{popupMessage}</div>
        </div>
      )}
    </div>
  );
};

export default Auth;










