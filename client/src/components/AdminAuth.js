// // client/src/components/AdminAuth.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const AdminAuth = () => {
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [message, setMessage] = useState('');
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/admin/login', formData);
//       localStorage.setItem('admin-token', response.data.token);
//       navigate('/admin/panel');
//     } catch (err) {
//       setMessage(err.response?.data.msg || 'Login failed. Check your credentials.');
//     }
//   };

//   return (
//     <div className="container card" style={{ maxWidth: '400px' }}>
//       <h2 className="text-center">Admin Login</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="form-group">
//           <label>Email</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </div>
//         <button type="submit" className="btn btn-primary">Login</button>
//       </form>
//       {message && <p className="text-center" style={{ marginTop: '20px', color: 'red' }}>{message}</p>}
//     </div>
//   );
// };

// export default AdminAuth;




// client/src/components/AdminAuth.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AdminAuth = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdminLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', formData);
      
      const { token, user } = response.data;
      if (user && user.isAdmin) {
        localStorage.setItem('admin-token', token);
        localStorage.setItem('user', JSON.stringify(user));
        setMessage('Admin login successful!');
        navigate('/admin/panel');
      } else {
        setMessage('Invalid admin credentials.');
      }
    } catch (err) {
      setMessage(err.response?.data.error || 'Failed to log in as admin.');
    }
  };

  return (
    <div className="container form-container">
      <h2 className="text-center">Admin Login</h2>
      <form onSubmit={handleAdminLogin} className="card">
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleInputChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleInputChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {message && <p className="text-center message">{message}</p>}
    </div>
  );
};

export default AdminAuth;