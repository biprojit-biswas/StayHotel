// client/src/components/AdminAuth.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const AdminAuth = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', formData);
      localStorage.setItem('admin-token', response.data.token);
      navigate('/admin/panel');
    } catch (err) {
      setMessage(err.response?.data.msg || 'Login failed. Check your credentials.');
    }
  };

  return (
    <div className="container card" style={{ maxWidth: '400px' }}>
      <h2 className="text-center">Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      {message && <p className="text-center" style={{ marginTop: '20px', color: 'red' }}>{message}</p>}
    </div>
  );
};

export default AdminAuth;




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