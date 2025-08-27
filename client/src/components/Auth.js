// // // // client/src/components/Auth.js
// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';
// // // import '../App.css';

// // // const Auth = ({ setIsAuthenticated }) => {
// // //   const [isLogin, setIsLogin] = useState(true);
// // //   const [formData, setFormData] = useState({
// // //     username: '',
// // //     email: '',
// // //     password: '',
// // //   });
// // //   const [popupMessage, setPopupMessage] = useState('');
// // //   const [isPopupVisible, setIsPopupVisible] = useState(false);
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const showPopup = (message) => {
// // //     setPopupMessage(message);
// // //     setIsPopupVisible(true);
// // //     setTimeout(() => {
// // //       setIsPopupVisible(false);
// // //     }, 3000); // Popup disappears after 3 seconds
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
// // //     try {
// // //       const response = await axios.post(url, formData);
// // //       console.log('Success:', response.data);
// // //       if (isLogin) {
// // //         localStorage.setItem('token', response.data.token);
// // //         setIsAuthenticated(true);
// // //         showPopup('Login successful!');
// // //         setTimeout(() => {
// // //           navigate('/home');
// // //         }, 1000); // Redirect after a short delay
// // //       } else {
// // //         showPopup('Registration successful! Please log in.');
// // //         setIsLogin(true);
// // //       }
// // //     } catch (err) {
// // //       console.error('Error:', err);
// // //       // Check if the response object exists before trying to access its data
// // //       if (err.response) {
// // //         showPopup('Error: ' + (err.response.data.error || err.response.data.msg));
// // //       } else {
// // //         // If there is no response, it means the server is likely down
// // //         showPopup('Error: Could not connect to the server.');
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="container card">
// // //       <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         {!isLogin && (
// // //           <div className="form-group">
// // //             <label>Username</label>
// // //             <input type="text" name="username" value={formData.username} onChange={handleChange} required />
// // //           </div>
// // //         )}
// // //         <div className="form-group">
// // //           <label>Email</label>
// // //           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
// // //         </div>
// // //         <div className="form-group">
// // //           <label>Password</label>
// // //           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
// // //         </div>
// // //         <button type="submit" className="btn btn-primary">
// // //           {isLogin ? 'Login' : 'Register'}
// // //         </button>
// // //       </form>
// // //       <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
// // //         {isLogin ? 'Need to create an account? Register' : 'Already have an account? Login'}
// // //       </button>
// // //       {isPopupVisible && (
// // //         <div className="popup-container">
// // //           <div className="popup-message">{popupMessage}</div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Auth;
// // // 
// // // // client/src/components/Auth.js
// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';
// // // import '../App.css';

// // // const Auth = ({ setIsAuthenticated }) => {
// // //   const [isLogin, setIsLogin] = useState(true);
// // //   const [formData, setFormData] = useState({
// // //     username: '',
// // //     email: '',
// // //     password: '',
// // //     role: 'customer', // Default role is 'customer'
// // //   });
// // //   const [popupMessage, setPopupMessage] = useState('');
// // //   const [isPopupVisible, setIsPopupVisible] = useState(false);
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const showPopup = (message) => {
// // //     setPopupMessage(message);
// // //     setIsPopupVisible(true);
// // //     setTimeout(() => {
// // //       setIsPopupVisible(false);
// // //     }, 3000); // Popup disappears after 3 seconds
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
// // //     try {
// // //       const response = await axios.post(url, formData);
// // //       console.log('Success:', response.data);
// // //       if (isLogin) {
// // //         localStorage.setItem('token', response.data.token);
// // //         setIsAuthenticated(true);
// // //         showPopup('Login successful!');
// // //         setTimeout(() => {
// // //           navigate('/home');
// // //         }, 1000); // Redirect after a short delay
// // //       } else {
// // //         showPopup('Registration successful! Please log in.');
// // //         setIsLogin(true);
// // //       }
// // //     } catch (err) {
// // //       console.error('Error:', err);
// // //       if (err.response) {
// // //         showPopup('Error: ' + (err.response.data.error || err.response.data.msg));
// // //       } else {
// // //         showPopup('Error: Could not connect to the server.');
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="container card">
// // //       <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         {!isLogin && (
// // //           <>
// // //             <div className="form-group">
// // //               <label>Username</label>
// // //               <input type="text" name="username" value={formData.username} onChange={handleChange} required />
// // //             </div>
// // //             <div className="form-group">
// // //               <label>Register As</label>
// // //               <select name="role" value={formData.role} onChange={handleChange} className="form-select">
// // //                 <option value="customer">Customer</option>
// // //                 <option value="staff">Staff</option>
// // //                 <option value="admin">Admin</option>
// // //               </select>
// // //             </div>
// // //           </>
// // //         )}
// // //         <div className="form-group">
// // //           <label>Email</label>
// // //           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
// // //         </div>
// // //         <div className="form-group">
// // //           <label>Password</label>
// // //           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
// // //         </div>
// // //         <button type="submit" className="btn btn-primary">
// // //           {isLogin ? 'Login' : 'Register'}
// // //         </button>
// // //       </form>
// // //       <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
// // //         {isLogin ? 'Need to create an account? Register' : 'Already have an account? Login'}
// // //       </button>
// // //       {isPopupVisible && (
// // //         <div className="popup-container">
// // //           <div className="popup-message">{popupMessage}</div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Auth;

// // // // client/src/components/Auth.js
// // // import React, { useState } from 'react';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';
// // // import '../App.css';

// // // const Auth = ({ setIsAuthenticated }) => {
// // //   const [isLogin, setIsLogin] = useState(true);
// // //   const [formData, setFormData] = useState({
// // //     username: '',
// // //     email: '',
// // //     password: '',
// // //     role: 'customer', // Default role is 'customer'
// // //   });
// // //   const [popupMessage, setPopupMessage] = useState('');
// // //   const [isPopupVisible, setIsPopupVisible] = useState(false);
// // //   const navigate = useNavigate();

// // //   const handleChange = (e) => {
// // //     setFormData({ ...formData, [e.target.name]: e.target.value });
// // //   };

// // //   const showPopup = (message) => {
// // //     setPopupMessage(message);
// // //     setIsPopupVisible(true);
// // //     setTimeout(() => {
// // //       setIsPopupVisible(false);
// // //     }, 3000);
// // //   };

// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
// // //     try {
// // //       const response = await axios.post(url, formData);
// // //       console.log('Success:', response.data);
// // //       if (isLogin) {
// // //         localStorage.setItem('token', response.data.token);
// // //         setIsAuthenticated(true);
// // //         showPopup('Login successful!');
// // //         setTimeout(() => {
// // //           navigate('/home');
// // //         }, 1000);
// // //       } else {
// // //         showPopup('Registration successful! Please log in.');
// // //         setIsLogin(true);
// // //       }
// // //     } catch (err) {
// // //       console.error('Error:', err);
// // //       if (err.response) {
// // //         showPopup('Error: ' + (err.response.data.msg || err.response.data.error || 'Please try again.'));
// // //       } else {
// // //         showPopup('Error: Could not connect to the server.');
// // //       }
// // //     }
// // //   };

// // //   return (
// // //     <div className="container card">
// // //       <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
// // //       <form onSubmit={handleSubmit}>
// // //         {!isLogin && (
// // //           <>
// // //             <div className="form-group">
// // //               <label>Username</label>
// // //               <input type="text" name="username" value={formData.username} onChange={handleChange} required />
// // //             </div>
// // //             <div className="form-group">
// // //               <label>Register As</label>
// // //               <select name="role" value={formData.role} onChange={handleChange} className="form-select">
// // //                 <option value="customer">Customer</option>
// // //                 <option value="staff">Staff</option>
// // //               </select>
// // //             </div>
// // //           </>
// // //         )}
// // //         <div className="form-group">
// // //           <label>Email</label>
// // //           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
// // //         </div>
// // //         <div className="form-group">
// // //           <label>Password</label>
// // //           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
// // //         </div>
// // //         <button type="submit" className="btn btn-primary">
// // //           {isLogin ? 'Login' : 'Register'}
// // //         </button>
// // //       </form>
// // //       <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
// // //         {isLogin ? 'Need to create an account? Register' : 'Already have an account? Login'}
// // //       </button>
// // //       {isPopupVisible && (
// // //         <div className="popup-container">
// // //           <div className="popup-message">{popupMessage}</div>
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // export default Auth;

// // // client/src/components/Auth.js
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';
// // import '../App.css';

// // const Auth = ({ setIsAuthenticated }) => {
// //   const [isLogin, setIsLogin] = useState(true);
// //   const [formData, setFormData] = useState({
// //     username: '',
// //     email: '',
// //     password: '',
// //     role: 'customer', // Default role is 'customer'
// //   });
// //   const [popupMessage, setPopupMessage] = useState('');
// //   const [isPopupVisible, setIsPopupVisible] = useState(false);
// //   const navigate = useNavigate();

// //   const handleChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //   };

// //   const showPopup = (message) => {
// //     setPopupMessage(message);
// //     setIsPopupVisible(true);
// //     setTimeout(() => {
// //       setIsPopupVisible(false);
// //     }, 3000);
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
// //     try {
// //       const response = await axios.post(url, formData);
// //       console.log('Success:', response.data);
// //       if (isLogin) {
// //         localStorage.setItem('token', response.data.token);
// //         setIsAuthenticated(true);
// //         showPopup('Login successful!');
// //         setTimeout(() => {
// //           navigate('/home');
// //         }, 1000);
// //       } else {
// //         showPopup('Registration successful! Please log in.');
// //         setIsLogin(true);
// //       }
// //     } catch (err) {
// //       console.error('Error:', err);
// //       if (err.response) {
// //         // Check for the specific admin registration error message
// //         if (err.response.data.msg === 'An admin user already exists.') {
// //           showPopup('You cannot register yourself as an admin. This hotel already has an admin. Thank you.');
// //         } else {
// //           showPopup('Error: ' + (err.response.data.msg || err.response.data.error || 'Please try again.'));
// //         }
// //       } else {
// //         showPopup('Error: Could not connect to the server.');
// //       }
// //     }
// //   };

// //   return (
// //     <div className="container card">
// //       <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
// //       <form onSubmit={handleSubmit}>
// //         {!isLogin && (
// //           <>
// //             <div className="form-group">
// //               <label>Username</label>
// //               <input type="text" name="username" value={formData.username} onChange={handleChange} required />
// //             </div>
// //             <div className="form-group">
// //               <label>Register As</label>
// //               <select name="role" value={formData.role} onChange={handleChange} className="form-select">
// //                 <option value="customer">Customer</option>
// //                 <option value="staff">Staff</option>
// //               </select>
// //             </div>
// //           </>
// //         )}
// //         <div className="form-group">
// //           <label>Email</label>
// //           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
// //         </div>
// //         <div className="form-group">
// //           <label>Password</label>
// //           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
// //         </div>
// //         <button type="submit" className="btn btn-primary">
// //           {isLogin ? 'Login' : 'Register'}
// //         </button>
// //       </form>
// //       <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
// //         {isLogin ? 'Need to create an account? Register' : 'Already have an account? Login'}
// //       </button>
// //       {isPopupVisible && (
// //         <div className="popup-container">
// //           <div className="popup-message">{popupMessage}</div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // export default Auth;

// // client/src/components/Auth.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const Auth = ({ setIsAuthenticated }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'customer', // Default role is 'customer'
//   });
//   const [popupMessage, setPopupMessage] = useState('');
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const showPopup = (message) => {
//     setPopupMessage(message);
//     setIsPopupVisible(true);
//     setTimeout(() => {
//       setIsPopupVisible(false);
//     }, 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
//     try {
//       const response = await axios.post(url, formData);
//       console.log('Success:', response.data);
//       if (isLogin) {
//         localStorage.setItem('token', response.data.token);
//         setIsAuthenticated(true);
//         showPopup('Login successful!');
//         setTimeout(() => {
//           navigate('/home');
//         }, 1000);
//       } else {
//         showPopup('Registration successful! Please log in.');
//         setIsLogin(true);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       if (err.response) {
//         // Check for the specific admin registration error message
//         if (err.response.data.msg === 'An admin user already exists.') {
//           showPopup('You cannot register yourself as an admin. This hotel already has an admin. Thank you.');
//         } else {
//           showPopup('Error: ' + (err.response.data.msg || err.response.data.error || 'Please try again.'));
//         }
//       } else {
//         showPopup('Error: Could not connect to the server.');
//       }
//     }
//   };

//   return (
//     <div className="container card">
//       <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
//       <form onSubmit={handleSubmit}>
//         {!isLogin && (
//           <>
//             <div className="form-group">
//               <label>Username</label>
//               <input type="text" name="username" value={formData.username} onChange={handleChange} required />
//             </div>
//             <div className="form-group">
//               <label>Register As</label>
//               <select name="role" value={formData.role} onChange={handleChange} className="form-select">
//                 <option value="customer">Customer</option>
//                 <option value="staff">Staff</option>
//               </select>
//             </div>
//           </>
//         )}
//         <div className="form-group">
//           <label>Email</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           {isLogin ? 'Login' : 'Register'}
//         </button>
//       </form>
//       <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
//         {isLogin ? 'Need to create an account? Register' : 'Already have an account? Login'}
//       </button>
//       {isPopupVisible && (
//         <div className="popup-container">
//           <div className="popup-message">{popupMessage}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Auth;

// // client/src/components/Auth.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';
// import '../App.css';

// const Auth = ({ setIsAuthenticated }) => {
//   const [isLogin, setIsLogin] = useState(true);
//   const [formData, setFormData] = useState({
//     username: '',
//     email: '',
//     password: '',
//     role: 'customer',
//   });
//   const [popupMessage, setPopupMessage] = useState('');
//   const [isPopupVisible, setIsPopupVisible] = useState(false);
//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const showPopup = (message) => {
//     setPopupMessage(message);
//     setIsPopupVisible(true);
//     setTimeout(() => {
//       setIsPopupVisible(false);
//     }, 3000);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const url = isLogin ? 'http://localhost:5000/api/auth/login' : 'http://localhost:5000/api/auth/register';
//     try {
//       const response = await axios.post(url, formData);
//       console.log('Success:', response.data);
//       if (isLogin) {
//         localStorage.setItem('token', response.data.token);
//         setIsAuthenticated(true);
//         showPopup('Login successful!');
//         setTimeout(() => {
//           navigate('/home');
//         }, 1000);
//       } else {
//         showPopup('Registration successful! Please log in.');
//         setIsLogin(true);
//       }
//     } catch (err) {
//       console.error('Error:', err);
//       if (err.response) {
//         if (err.response.data.msg === 'An admin user already exists.') {
//           showPopup('You cannot register yourself as an admin. This hotel already has an admin. Thank you.');
//         } else {
//           showPopup('Error: ' + (err.response.data.msg || err.response.data.error || 'Please try again.'));
//         }
//       } else {
//         showPopup('Error: Could not connect to the server.');
//       }
//     }
//   };

//   return (
//     <div className="container card">
//       <h2 className="text-center">{isLogin ? 'Login' : 'Register'}</h2>
//       <form onSubmit={handleSubmit}>
//         {!isLogin && (
//           <>
//             <div className="form-group">
//               <label>Username</label>
//               <input type="text" name="username" value={formData.username} onChange={handleChange} required />
//             </div>
//             <div className="form-group">
//               <label>Register As</label>
//               <select name="role" value={formData.role} onChange={handleChange} className="form-select">
//                 <option value="customer">Customer</option>
//                 <option value="staff">Staff</option>
//               </select>
//             </div>
//           </>
//         )}
//         <div className="form-group">
//           <label>Email</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} required />
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} required />
//         </div>
//         <button type="submit" className="btn btn-primary">
//           {isLogin ? 'Login' : 'Register'}
//         </button>
//       </form>
//       <button onClick={() => setIsLogin(!isLogin)} className="btn btn-link">
//         {isLogin ? 'Need to create an account? Register' : 'Already have an account? Login'}
//       </button>
//       {isPopupVisible && (
//         <div className="popup-container">
//           <div className="popup-message">{popupMessage}</div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Auth;



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
        setIsAuthenticated(true);
        showPopup('Login successful!');
        setTimeout(() => {
          navigate('/home'); // Corrected navigation to the homepage
        }, 1000);
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