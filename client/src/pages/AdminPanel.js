// // // client/src/pages/AdminPanel.js
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import '../App.css';

// // const AdminPanel = () => {
// //   const [reviews, setReviews] = useState({ roomReviews: [], transferReviews: [] });
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);

// //   useEffect(() => {
// //     const fetchReviews = async () => {
// //       const token = localStorage.getItem('admin-token');
// //       if (!token) {
// //         setError('Not authorized. Please log in as an admin.');
// //         setLoading(false);
// //         return;
// //       }
// //       try {
// //         const response = await axios.get('http://localhost:5000/api/admin/reviews', {
// //           headers: { 'x-auth-token': token },
// //         });
// //         setReviews(response.data);
// //       } catch (err) {
// //         setError(err.response?.data.msg || 'Failed to fetch reviews.');
// //       } finally {
// //         setLoading(false);
// //       }
// //     };
// //     fetchReviews();
// //   }, []);

// //   if (loading) return <div className="text-center loading-message">Loading admin panel...</div>;
// //   if (error) return <div className="text-center error-message">{error}</div>;

// //   return (
// //     <div className="container admin-panel-container">
// //       <h2 className="admin-panel-title">Admin Panel</h2>
// //       <div className="admin-content-grid">
// //         <div className="admin-card card">
// //           <h3 className="admin-card-title">Room Reviews</h3>
// //           {reviews.roomReviews.length > 0 ? (
// //             reviews.roomReviews.map(review => (
// //               <div key={review._id} className="admin-review-item">
// //                 <p><strong>Room:</strong> {review.roomId?.title}</p>
// //                 <p><strong>User:</strong> {review.userId?.username}</p>
// //                 <p><strong>Rating:</strong> {review.rating}/5</p>
// //                 <p><strong>Comment:</strong> "{review.comment}"</p>
// //               </div>
// //             ))
// //           ) : <p>No room reviews found.</p>}
// //         </div>
// //         <div className="admin-card card">
// //           <h3 className="admin-card-title">Transfer Reviews</h3>
// //           {reviews.transferReviews.length > 0 ? (
// //             reviews.transferReviews.map(review => (
// //               <div key={review._id} className="admin-review-item">
// //                 <p><strong>Transfer:</strong> {review.transferId?.transferType}</p>
// //                 <p><strong>User:</strong> {review.userId?.username}</p>
// //                 <p><strong>Rating:</strong> {review.rating}/5</p>
// //                 <p><strong>Comment:</strong> "{review.comment}"</p>
// //               </div>
// //             ))
// //           ) : <p>No transfer reviews found.</p>}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdminPanel;

// // client/src/pages/AdminPanel.js
// import React from 'react';
// import { Link } from 'react-router-dom';
// import '../App.css';

// const AdminPanel = () => {
//   return (
//     <div className="admin-container">
//       <h1 className="admin-title">Admin Dashboard</h1>
//       <p className="admin-subtitle">Welcome to the control panel.</p>

//       <div className="admin-actions-grid">
//         <Link to="/admin/add-staff" className="admin-action-card card">
//           <div className="admin-icon"><i className="fas fa-user-plus"></i></div>
//           <h3 className="admin-action-title">Add Staff</h3>
//           <p>Create new staff user accounts for hotel management.</p>
//         </Link>

//         <Link to="/admin/assign-money" className="admin-action-card card">
//           <div className="admin-icon"><i className="fas fa-wallet"></i></div>
//           <h3 className="admin-action-title">Assign Funds</h3>
//           <p>Assign credit or funds to a client's account.</p>
//         </Link>

//         <Link to="/add-room" className="admin-action-card card">
//           <div className="admin-icon"><i className="fas fa-bed"></i></div>
//           <h3 className="admin-action-title">Add Room</h3>
//           <p>Add new rooms to the hotel database.</p>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AdminPanel;

// import React from 'react';
// import { Link } from 'react-router-dom';
// import { FaBed, FaUsers, FaStar, FaPlus, FaMoneyBillWave } from 'react-icons/fa'; // Icons for the dashboard

// const AdminPanel = ({ currentView, setCurrentView, rooms, setRooms, feedback, setFeedback, staffAndUsers, setStaffAndUsers }) => {
//   // This component acts as the main view controller, rendering different sub-components based on the currentView state.

//   // Dummy data and state management for demonstration purposes.
//   // In a real application, this would be handled by a backend API.
//   const handleAddRoom = (newRoomData) => {
//     // In a real app, this would be an API call
//     console.log('Adding new room:', newRoomData);
//     setRooms(prevRooms => [...prevRooms, { ...newRoomData, id: Date.now() }]);
//   };

//   const handleDeleteRoom = (roomId) => {
//     // In a real app, this would be an API call
//     console.log('Deleting room:', roomId);
//     setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
//   };

//   const handleAddStaff = (newStaffData) => {
//     console.log('Adding new staff:', newStaffData);
//     setStaffAndUsers(prevUsers => [...prevUsers, { ...newStaffData, id: Date.now() }]);
//   };

//   const handleUpdateRole = (userId, newRole) => {
//     console.log(`Updating role for user ${userId} to ${newRole}`);
//     setStaffAndUsers(prevUsers =>
//       prevUsers.map(user => (user.id === userId ? { ...user, role: newRole } : user))
//     );
//   };

//   const handleDeleteUser = (userId) => {
//     console.log('Deleting user:', userId);
//     setStaffAndUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
//   };

//   const renderDashboard = () => (
//     <div className="dashboard-grid">
//       <div className="dashboard-card" onClick={() => setCurrentView('manageRooms')}>
//         <FaBed className="card-icon" />
//         <h3 className="card-title">Manage Hotel Rooms</h3>
//         <p className="card-subtitle">Add, edit, or delete room listings.</p>
//       </div>
//       <div className="dashboard-card" onClick={() => setCurrentView('manageStaffAndUsers')}>
//         <FaUsers className="card-icon" />
//         <h3 className="card-title">Manage Staff & Users</h3>
//         <p className="card-subtitle">View and manage staff accounts and user roles.</p>
//       </div>
//       <div className="dashboard-card" onClick={() => setCurrentView('viewFeedback')}>
//         <FaStar className="card-icon" />
//         <h3 className="card-title">View Feedback</h3>
//         <p className="card-subtitle">Review customer feedback and ratings.</p>
//       </div>
//     </div>
//   );

//   const renderManageRooms = () => (
//     <div className="admin-content-section">
//       <button className="back-btn" onClick={() => setCurrentView('dashboard')}>
//         &larr; Back to Dashboard
//       </button>
//       <h2 className="section-heading">Manage Hotel Rooms</h2>
//       <div className="content-grid">
//         <div className="card form-card">
//           <h3 className="form-heading"><FaPlus /> Add New Room</h3>
//           <form onSubmit={(e) => {
//             e.preventDefault();
//             const formData = new FormData(e.target);
//             const newRoomData = {
//               title: formData.get('title'),
//               description: formData.get('description'),
//               price: parseFloat(formData.get('price')),
//               roomType: formData.get('roomType'),
//               amenities: [...formData.getAll('amenities')],
//               image: formData.get('image'),
//             };
//             handleAddRoom(newRoomData);
//             e.target.reset();
//           }}>
//             <div className="form-group">
//               <label htmlFor="title">Title</label>
//               <input type="text" id="title" name="title" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea id="description" name="description" required></textarea>
//             </div>
//             <div className="form-group-row">
//               <div className="form-group">
//                 <label htmlFor="price">Price (USD)</label>
//                 <input type="number" id="price" name="price" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="roomType">Room Type</label>
//                 <select id="roomType" name="roomType">
//                   <option value="Single">Single</option>
//                   <option value="Double">Double</option>
//                   <option value="Suite">Suite</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Amenities</label>
//               <div className="checkbox-group">
//                 <label><input type="checkbox" name="amenities" value="AC" /> AC</label>
//                 <label><input type="checkbox" name="amenities" value="Breakfast" /> Breakfast</label>
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="image">Image URL</label>
//               <input type="text" id="image" name="image" required />
//             </div>
//             <button type="submit" className="btn btn-primary">Add Room</button>
//           </form>
//         </div>

//         <div className="card list-card">
//           <h3 className="list-heading">Existing Rooms ({rooms.length})</h3>
//           <ul className="item-list">
//             {rooms.length > 0 ? (
//               rooms.map(room => (
//                 <li key={room.id} className="list-item">
//                   <span className="item-text">{room.title} - ${room.price}</span>
//                   <button className="delete-btn" onClick={() => handleDeleteRoom(room.id)}>Delete</button>
//                 </li>
//               ))
//             ) : (
//               <p className="no-items">No rooms found. Add a new one!</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );

//   const renderManageStaffAndUsers = () => (
//     <div className="admin-content-section">
//       <button className="back-btn" onClick={() => setCurrentView('dashboard')}>
//         &larr; Back to Dashboard
//       </button>
//       <h2 className="section-heading">Manage Staff & Users</h2>
//       <div className="content-grid">
//         <div className="card form-card">
//           <h3 className="form-heading"><FaPlus /> Add New Staff</h3>
//           <form onSubmit={(e) => {
//             e.preventDefault();
//             const formData = new FormData(e.target);
//             const newStaffData = {
//               email: formData.get('email'),
//               role: formData.get('role'),
//             };
//             handleAddStaff(newStaffData);
//             e.target.reset();
//           }}>
//             <div className="form-group">
//               <label htmlFor="email">Staff Email</label>
//               <input type="email" id="email" name="email" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="role">Role</label>
//               <select id="role" name="role">
//                 <option value="staff">Staff</option>
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary">Add Staff</button>
//           </form>
//         </div>

//         <div className="card list-card">
//           <h3 className="list-heading">User and Staff List ({staffAndUsers.length})</h3>
//           <ul className="item-list">
//             {staffAndUsers.length > 0 ? (
//               staffAndUsers.map(user => (
//                 <li key={user.id} className="list-item user-item">
//                   <div className="user-info">
//                     <span className="user-email">{user.email || 'User'}</span>
//                     <span className={`user-role ${user.role}`}>{user.role}</span>
//                   </div>
//                   <div className="user-actions">
//                     <select
//                       className="role-select"
//                       value={user.role}
//                       onChange={(e) => handleUpdateRole(user.id, e.target.value)}
//                     >
//                       <option value="user">User</option>
//                       <option value="staff">Staff</option>
//                       <option value="admin">Admin</option>
//                     </select>
//                     <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <p className="no-items">No staff or users found. Add a new one!</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );

//   const renderViewFeedback = () => (
//     <div className="admin-content-section">
//       <button className="back-btn" onClick={() => setCurrentView('dashboard')}>
//         &larr; Back to Dashboard
//       </button>
//       <h2 className="section-heading">Customer Feedback</h2>
//       <div className="card list-card">
//         <h3 className="list-heading">Feedback ({feedback.length})</h3>
//         <ul className="item-list">
//           {feedback.length > 0 ? (
//             feedback.map(f => (
//               <li key={f.id} className="list-item feedback-item">
//                 <div className="feedback-details">
//                   <p><strong>User:</strong> {f.user}</p>
//                   <p><strong>Rating:</strong> {f.rating} / 5</p>
//                   <p className="comment">"{f.comment}"</p>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <p className="no-items">No feedback found.</p>
//           )}
//         </ul>
//       </div>
//     </div>
//   );

//   return (
//     <div className="admin-container">
//       <header className="admin-header">
//         <h1 className="main-title">Admin Dashboard</h1>
//         <p className="user-info">
//           Welcome back!
//           <Link to="/" className="logout-btn">Log Out</Link>
//         </p>
//       </header>

//       {currentView === 'dashboard' && renderDashboard()}
//       {currentView === 'manageRooms' && renderManageRooms()}
//       {currentView === 'manageStaffAndUsers' && renderManageStaffAndUsers()}
//       {currentView === 'viewFeedback' && renderViewFeedback()}
//     </div>
//   );
// };

// export default AdminPanel;

// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBed, FaUsers, FaStar, FaPlus, FaMoneyBillWave } from 'react-icons/fa';

// const AdminPanel = ({ handleLogout }) => {
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [rooms, setRooms] = useState([
//     // Dummy Data
//     { id: '1', title: 'Luxury Suite', price: 250 },
//     { id: '2', title: 'Executive Room', price: 150 },
//   ]);
//   const [feedback, setFeedback] = useState([
//     // Dummy Data
//     { id: 'f1', user: 'guest123', rating: 5, comment: 'Great service, loved the room!' },
//     { id: 'f2', user: 'traveller_x', rating: 4, comment: 'The breakfast was excellent.' },
//   ]);
//   const [staffAndUsers, setStaffAndUsers] = useState([
//     // Dummy Data
//     { id: '1', email: 'admin@example.com', role: 'admin' },
//     { id: '2', email: 'staff@example.com', role: 'staff' },
//     { id: '3', email: 'user@example.com', role: 'user' },
//   ]);

//   const handleAddRoom = (newRoomData) => {
//     console.log('Adding new room:', newRoomData);
//     setRooms(prevRooms => [...prevRooms, { ...newRoomData, id: Date.now() }]);
//   };

//   const handleDeleteRoom = (roomId) => {
//     console.log('Deleting room:', roomId);
//     setRooms(prevRooms => prevRooms.filter(room => room.id !== roomId));
//   };

//   const handleAddStaff = (newStaffData) => {
//     console.log('Adding new staff:', newStaffData);
//     setStaffAndUsers(prevUsers => [...prevUsers, { ...newStaffData, id: Date.now() }]);
//   };

//   const handleUpdateRole = (userId, newRole) => {
//     console.log(`Updating role for user ${userId} to ${newRole}`);
//     setStaffAndUsers(prevUsers =>
//       prevUsers.map(user => (user.id === userId ? { ...user, role: newRole } : user))
//     );
//   };

//   const handleDeleteUser = (userId) => {
//     console.log('Deleting user:', userId);
//     setStaffAndUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
//   };

//   const renderDashboard = () => (
//     <div className="dashboard-grid">
//       <div className="dashboard-card" onClick={() => setCurrentView('manageRooms')}>
//         <FaBed className="card-icon" />
//         <h3 className="card-title">Manage Hotel Rooms</h3>
//         <p className="card-subtitle">Add, edit, or delete room listings.</p>
//       </div>
//       <div className="dashboard-card" onClick={() => setCurrentView('manageStaffAndUsers')}>
//         <FaUsers className="card-icon" />
//         <h3 className="card-title">Manage Staff & Users</h3>
//         <p className="card-subtitle">View and manage staff accounts and user roles.</p>
//       </div>
//       <div className="dashboard-card" onClick={() => setCurrentView('viewFeedback')}>
//         <FaStar className="card-icon" />
//         <h3 className="card-title">View Feedback</h3>
//         <p className="card-subtitle">Review customer feedback and ratings.</p>
//       </div>
//     </div>
//   );

//   const renderManageRooms = () => (
//     <div className="admin-content-section">
//       <button className="back-btn" onClick={() => setCurrentView('dashboard')}>
//         &larr; Back to Dashboard
//       </button>
//       <h2 className="section-heading">Manage Hotel Rooms</h2>
//       <div className="content-grid">
//         <div className="card form-card">
//           <h3 className="form-heading"><FaPlus /> Add New Room</h3>
//           <form onSubmit={(e) => {
//             e.preventDefault();
//             const formData = new FormData(e.target);
//             const newRoomData = {
//               title: formData.get('title'),
//               description: formData.get('description'),
//               price: parseFloat(formData.get('price')),
//               roomType: formData.get('roomType'),
//               amenities: [...formData.getAll('amenities')],
//               image: formData.get('image'),
//             };
//             handleAddRoom(newRoomData);
//             e.target.reset();
//           }}>
//             <div className="form-group">
//               <label htmlFor="title">Title</label>
//               <input type="text" id="title" name="title" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea id="description" name="description" required></textarea>
//             </div>
//             <div className="form-group-row">
//               <div className="form-group">
//                 <label htmlFor="price">Price (USD)</label>
//                 <input type="number" id="price" name="price" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="roomType">Room Type</label>
//                 <select id="roomType" name="roomType">
//                   <option value="Single">Single</option>
//                   <option value="Double">Double</option>
//                   <option value="Suite">Suite</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Amenities</label>
//               <div className="checkbox-group">
//                 <label><input type="checkbox" name="amenities" value="AC" /> AC</label>
//                 <label><input type="checkbox" name="amenities" value="Breakfast" /> Breakfast</label>
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="image">Image URL</label>
//               <input type="text" id="image" name="image" required />
//             </div>
//             <button type="submit" className="btn btn-primary">Add Room</button>
//           </form>
//         </div>

//         <div className="card list-card">
//           <h3 className="list-heading">Existing Rooms ({rooms.length})</h3>
//           <ul className="item-list">
//             {rooms.length > 0 ? (
//               rooms.map(room => (
//                 <li key={room.id} className="list-item">
//                   <span className="item-text">{room.title} - ${room.price}</span>
//                   <button className="delete-btn" onClick={() => handleDeleteRoom(room.id)}>Delete</button>
//                 </li>
//               ))
//             ) : (
//               <p className="no-items">No rooms found. Add a new one!</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );

//   const renderManageStaffAndUsers = () => (
//     <div className="admin-content-section">
//       <button className="back-btn" onClick={() => setCurrentView('dashboard')}>
//         &larr; Back to Dashboard
//       </button>
//       <h2 className="section-heading">Manage Staff & Users</h2>
//       <div className="content-grid">
//         <div className="card form-card">
//           <h3 className="form-heading"><FaPlus /> Add New Staff</h3>
//           <form onSubmit={(e) => {
//             e.preventDefault();
//             const formData = new FormData(e.target);
//             const newStaffData = {
//               email: formData.get('email'),
//               role: formData.get('role'),
//             };
//             handleAddStaff(newStaffData);
//             e.target.reset();
//           }}>
//             <div className="form-group">
//               <label htmlFor="email">Staff Email</label>
//               <input type="email" id="email" name="email" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="role">Role</label>
//               <select id="role" name="role">
//                 <option value="staff">Staff</option>
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary">Add Staff</button>
//           </form>
//         </div>

//         <div className="card list-card">
//           <h3 className="list-heading">User and Staff List ({staffAndUsers.length})</h3>
//           <ul className="item-list">
//             {staffAndUsers.length > 0 ? (
//               staffAndUsers.map(user => (
//                 <li key={user.id} className="list-item user-item">
//                   <div className="user-info">
//                     <span className="user-email">{user.email || 'User'}</span>
//                     <span className={`user-role ${user.role}`}>{user.role}</span>
//                   </div>
//                   <div className="user-actions">
//                     <select
//                       className="role-select"
//                       value={user.role}
//                       onChange={(e) => handleUpdateRole(user.id, e.target.value)}
//                     >
//                       <option value="user">User</option>
//                       <option value="staff">Staff</option>
//                       <option value="admin">Admin</option>
//                     </select>
//                     <button className="delete-btn" onClick={() => handleDeleteUser(user.id)}>Delete</button>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <p className="no-items">No staff or users found. Add a new one!</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );

//   const renderViewFeedback = () => (
//     <div className="admin-content-section">
//       <button className="back-btn" onClick={() => setCurrentView('dashboard')}>
//         &larr; Back to Dashboard
//       </button>
//       <h2 className="section-heading">Customer Feedback</h2>
//       <div className="card list-card">
//         <h3 className="list-heading">Feedback ({feedback.length})</h3>
//         <ul className="item-list">
//           {feedback.length > 0 ? (
//             feedback.map(f => (
//               <li key={f.id} className="list-item feedback-item">
//                 <div className="feedback-details">
//                   <p><strong>User:</strong> {f.user}</p>
//                   <p><strong>Rating:</strong> {f.rating} / 5</p>
//                   <p className="comment">"{f.comment}"</p>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <p className="no-items">No feedback found.</p>
//           )}
//         </ul>
//       </div>
//     </div>
//   );

//   return (
//     <div className="admin-container">
//       <header className="admin-header">
//         <h1 className="main-title">Admin Dashboard</h1>
//         <p className="user-info">
//           Welcome back!
//           <button onClick={handleLogout} className="logout-btn">Log Out</button>
//         </p>
//       </header>

//       {currentView === 'dashboard' && renderDashboard()}
//       {currentView === 'manageRooms' && renderManageRooms()}
//       {currentView === 'manageStaffAndUsers' && renderManageStaffAndUsers()}
//       {currentView === 'viewFeedback' && renderViewFeedback()}
//     </div>
//   );
// };

// export default AdminPanel;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { FaBed, FaUsers, FaStar, FaPlus, FaTrash } from 'react-icons/fa';
// import axios from 'axios';

// const AdminPanel = ({ handleLogout }) => {
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [rooms, setRooms] = useState([]);
//   const [feedback, setFeedback] = useState([]);
//   const [staffAndUsers, setStaffAndUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const API_BASE_URL = 'http://localhost:5000/api';

//   useEffect(() => {
//     const fetchAllData = async () => {
//       try {
//         setLoading(true);
//         // Fetch all data in parallel to populate the dashboard sections
//         const [roomsRes, feedbackRes, usersRes] = await Promise.all([
//           axios.get(`${API_BASE_URL}/rooms`),
//           axios.get(`${API_BASE_URL}/feedback`),
//           axios.get(`${API_BASE_URL}/users`),
//         ]);
//         setRooms(roomsRes.data);
//         setFeedback(feedbackRes.data);
//         setStaffAndUsers(usersRes.data);
//       } catch (err) {
//         setError('Failed to fetch data from the server. Check if the server is running and the API endpoints are correct.');
//         console.error('Error fetching data:', err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAllData();
//   }, []);

//   const handleAddRoom = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const newRoomData = {
//       title: formData.get('title'),
//       description: formData.get('description'),
//       price: parseFloat(formData.get('price')),
//       roomType: formData.get('roomType'),
//       beds: parseInt(formData.get('beds')),
//       guests: parseInt(formData.get('guests')),
//       amenities: [...formData.getAll('amenities')],
//       image: formData.get('image'),
//     };
//     try {
//       // Corrected endpoint for adding a room
//       await axios.post(`${API_BASE_URL}/rooms/add`, newRoomData);
//       const response = await axios.get(`${API_BASE_URL}/rooms`);
//       setRooms(response.data);
//       e.target.reset();
//     } catch (err) {
//       setError('Failed to add room.');
//       console.error('Error adding room:', err);
//     }
//   };

//   const handleDeleteRoom = async (roomId) => {
//     try {
//       // Corrected endpoint for deleting a room
//       await axios.delete(`${API_BASE_URL}/rooms/${roomId}`);
//       const response = await axios.get(`${API_BASE_URL}/rooms`);
//       setRooms(response.data);
//     } catch (err) {
//       setError('Failed to delete room.');
//       console.error('Error deleting room:', err);
//     }
//   };

//   const handleAddStaff = async (e) => {
//     e.preventDefault();
//     const formData = new FormData(e.target);
//     const newStaffData = {
//       email: formData.get('email'),
//       role: formData.get('role'),
//     };
//     try {
//       // Corrected endpoint for adding a staff member
//       await axios.post(`${API_BASE_URL}/admin/staff/add`, newStaffData);
//       const response = await axios.get(`${API_BASE_URL}/users`);
//       setStaffAndUsers(response.data);
//       e.target.reset();
//     } catch (err) {
//       setError('Failed to add staff.');
//       console.error('Error adding staff:', err);
//     }
//   };

//   const handleUpdateRole = async (userId, newRole) => {
//     try {
//       // Corrected endpoint for updating user role
//       await axios.put(`${API_BASE_URL}/admin/users/${userId}/role`, { role: newRole });
//       const response = await axios.get(`${API_BASE_URL}/users`);
//       setStaffAndUsers(response.data);
//     } catch (err) {
//       setError('Failed to update role.');
//       console.error('Error updating role:', err);
//     }
//   };

//   const handleDeleteUser = async (userId) => {
//     try {
//       // Corrected endpoint for deleting a user
//       await axios.delete(`${API_BASE_URL}/admin/users/${userId}`);
//       const response = await axios.get(`${API_BASE_URL}/users`);
//       setStaffAndUsers(response.data);
//     } catch (err) {
//       setError('Failed to delete user.');
//       console.error('Error deleting user:', err);
//     }
//   };

//   const renderDashboard = () => (
//     <div className="dashboard-grid">
//       <div className="dashboard-card" onClick={() => setCurrentView('manageRooms')}>
//         <FaBed className="card-icon" />
//         <h3 className="card-title">Manage Hotel Rooms</h3>
//         <p className="card-subtitle">Add, edit, or delete room listings.</p>
//       </div>
//       <div className="dashboard-card" onClick={() => setCurrentView('manageStaffAndUsers')}>
//         <FaUsers className="card-icon" />
//         <h3 className="card-title">Manage Staff & Users</h3>
//         <p className="card-subtitle">View and manage staff accounts and user roles.</p>
//       </div>
//       <div className="dashboard-card" onClick={() => setCurrentView('viewFeedback')}>
//         <FaStar className="card-icon" />
//         <h3 className="card-title">View Feedback</h3>
//         <p className="card-subtitle">Review customer feedback and ratings.</p>
//       </div>
//     </div>
//   );

//   const renderManageRooms = () => (
//     <div className="admin-content-section">
//       <button className="back-btn" onClick={() => setCurrentView('dashboard')}>
//         &larr; Back to Dashboard
//       </button>
//       <h2 className="section-heading">Manage Hotel Rooms</h2>
//       {loading && <p>Loading rooms...</p>}
//       {error && <p className="error-message">{error}</p>}
//       <div className="content-grid">
//         <div className="card form-card">
//           <h3 className="form-heading"><FaPlus /> Add New Room</h3>
//           <form onSubmit={handleAddRoom}>
//             <div className="form-group">
//               <label htmlFor="title">Title</label>
//               <input type="text" id="title" name="title" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <textarea id="description" name="description" required></textarea>
//             </div>
//             <div className="form-group-row">
//               <div className="form-group">
//                 <label htmlFor="price">Price (USD)</label>
//                 <input type="number" id="price" name="price" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="roomType">Room Type</label>
//                 <select id="roomType" name="roomType">
//                   <option value="Single">Single</option>
//                   <option value="Double">Double</option>
//                   <option value="Suite">Suite</option>
//                 </select>
//               </div>
//             </div>
//             <div className="form-group-row">
//               <div className="form-group">
//                 <label htmlFor="beds">Beds</label>
//                 <input type="number" id="beds" name="beds" required />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="guests">Guests</label>
//                 <input type="number" id="guests" name="guests" required />
//               </div>
//             </div>
//             <div className="form-group">
//               <label>Amenities</label>
//               <div className="checkbox-group">
//                 <label><input type="checkbox" name="amenities" value="AC" /> AC</label>
//                 <label><input type="checkbox" name="amenities" value="Breakfast" /> Breakfast</label>
//               </div>
//             </div>
//             <div className="form-group">
//               <label htmlFor="image">Image URL</label>
//               <input type="text" id="image" name="image" required />
//             </div>
//             <button type="submit" className="btn btn-primary">Add Room</button>
//           </form>
//         </div>
//         <div className="card list-card">
//           <h3 className="list-heading">Existing Rooms ({rooms.length})</h3>
//           <ul className="item-list">
//             {rooms.length > 0 ? (
//               rooms.map(room => (
//                 <li key={room._id} className="list-item room-item">
//                   <div className="room-info-card">
//                     <img src={room.image || 'https://via.placeholder.com/100x80'} alt={room.title} className="room-image" />
//                     <div className="room-details">
//                       <span className="item-text">{room.title}</span>
//                       <span className="item-price">${room.price}</span>
//                     </div>
//                   </div>
//                   <button className="delete-btn" onClick={() => handleDeleteRoom(room._id)}>
//                     <FaTrash />
//                   </button>
//                 </li>
//               ))
//             ) : (
//               <p className="no-items">No rooms found. Add a new one!</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );

//   const renderManageStaffAndUsers = () => (
//     <div className="admin-content-section">
//       <button className="back-btn" onClick={() => setCurrentView('dashboard')}>
//         &larr; Back to Dashboard
//       </button>
//       <h2 className="section-heading">Manage Staff & Users</h2>
//       {loading && <p>Loading users...</p>}
//       {error && <p className="error-message">{error}</p>}
//       <div className="content-grid">
//         <div className="card form-card">
//           <h3 className="form-heading"><FaPlus /> Add New Staff</h3>
//           <form onSubmit={handleAddStaff}>
//             <div className="form-group">
//               <label htmlFor="email">Staff Email</label>
//               <input type="email" id="email" name="email" required />
//             </div>
//             <div className="form-group">
//               <label htmlFor="role">Role</label>
//               <select id="role" name="role">
//                 <option value="staff">Staff</option>
//                 <option value="admin">Admin</option>
//                 <option value="user">User</option>
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary">Add Staff</button>
//           </form>
//         </div>

//         <div className="card list-card">
//           <h3 className="list-heading">User and Staff List ({staffAndUsers.length})</h3>
//           <ul className="item-list">
//             {staffAndUsers.length > 0 ? (
//               staffAndUsers.map(user => (
//                 <li key={user._id} className="list-item user-item">
//                   <div className="user-info">
//                     <span className="user-email">{user.email || 'User'}</span>
//                     <span className={`user-role ${user.role}`}>{user.role}</span>
//                   </div>
//                   <div className="user-actions">
//                     <select
//                       className="role-select"
//                       value={user.role}
//                       onChange={(e) => handleUpdateRole(user._id, e.target.value)}
//                     >
//                       <option value="user">User</option>
//                       <option value="staff">Staff</option>
//                       <option value="admin">Admin</option>
//                     </select>
//                     <button className="delete-btn" onClick={() => handleDeleteUser(user._id)}>Delete</button>
//                   </div>
//                 </li>
//               ))
//             ) : (
//               <p className="no-items">No staff or users found. Add a new one!</p>
//             )}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );

//   const renderViewFeedback = () => (
//     <div className="admin-content-section">
//       <button className="back-btn" onClick={() => setCurrentView('dashboard')}>
//         &larr; Back to Dashboard
//       </button>
//       <h2 className="section-heading">Customer Feedback</h2>
//       {loading && <p>Loading feedback...</p>}
//       {error && <p className="error-message">{error}</p>}
//       <div className="card list-card">
//         <h3 className="list-heading">Feedback ({feedback.length})</h3>
//         <ul className="item-list">
//           {feedback.length > 0 ? (
//             feedback.map(f => (
//               <li key={f._id} className="list-item feedback-item">
//                 <div className="feedback-details">
//                   <p><strong>User:</strong> {f.user}</p>
//                   <p><strong>Rating:</strong> {f.rating} / 5</p>
//                   <p className="comment">"{f.comment}"</p>
//                 </div>
//               </li>
//             ))
//           ) : (
//             <p className="no-items">No feedback found.</p>
//             )}
//           </ul>
//         </div>
//       </div>
//   );

//   if (loading) {
//     return (
//       <div className="loading-container">
//         <div className="spinner"></div>
//         <p>Loading...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="admin-container">
//       <header className="admin-header">
//         <h1 className="main-title">Admin Dashboard</h1>
//         <p className="user-info">
//           Welcome back!
//           <button onClick={handleLogout} className="logout-btn">Log Out</button>
//         </p>
//       </header>

//       {currentView === 'dashboard' && renderDashboard()}
//       {currentView === 'manageRooms' && renderManageRooms()}
//       {currentView === 'manageStaffAndUsers' && renderManageStaffAndUsers()}
//       {currentView === 'viewFeedback' && renderViewFeedback()}
//     </div>
//   );
// };

// export default AdminPanel;

// client/src/pages/AdminPanel.js

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBed, FaUsers, FaStar, FaPlus, FaTrash } from "react-icons/fa";
import axios from "axios";

const AdminPanel = ({ handleLogout }) => {
  const [currentView, setCurrentView] = useState("dashboard");
  const [rooms, setRooms] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [staffAndUsers, setStaffAndUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE_URL = "http://localhost:5000/api";

  useEffect(() => {
    // This function fetches public data, so it doesn't need a token.
    const fetchAllData = async () => {
      try {
        setLoading(true);
        const [roomsRes, feedbackRes, usersRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/rooms`),
          axios.get(`${API_BASE_URL}/feedback`),
          axios.get(`${API_BASE_URL}/users`),
        ]);
        setRooms(roomsRes.data);
        setFeedback(feedbackRes.data);
        setStaffAndUsers(usersRes.data);
      } catch (err) {
        setError("Failed to fetch data from the server.");
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAllData();
  }, []);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newRoomData = {
      title: formData.get("title"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      roomType: formData.get("roomType"),
      beds: parseInt(formData.get("beds")),
      guests: parseInt(formData.get("guests")),
      amenities: [...formData.getAll("amenities")],
      image: formData.get("image"),
    };
    try {
      // FIX: Use the 'token' key, which is set by Auth.js upon login
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/rooms/add`, newRoomData, {
        headers: { "x-auth-token": token },
      });
      const response = await axios.get(`${API_BASE_URL}/rooms`);
      setRooms(response.data);
      e.target.reset();
    } catch (err) {
      setError("Failed to add room. You may not be authorized.");
      console.error("Error adding room:", err);
    }
  };

  const handleDeleteRoom = async (roomId) => {
    try {
      // FIX: Use the 'token' key
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/rooms/${roomId}`, {
        headers: { "x-auth-token": token },
      });
      const response = await axios.get(`${API_BASE_URL}/rooms`);
      setRooms(response.data);
    } catch (err) {
      setError("Failed to delete room. You may not be authorized.");
      console.error("Error deleting room:", err);
    }
  };

// Corrected code for handleAddStaff
const handleAddStaff = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newStaffData = {
      username: formData.get("username"),
      email: formData.get("email"),
      password: formData.get("password"),
    };
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_BASE_URL}/admin/staff/add`, newStaffData, {
        headers: { "x-auth-token": token },
      });
      // Refresh the user list after successfully adding a new user
      const response = await axios.get(`${API_BASE_URL}/users`, {
         headers: { "x-auth-token": token },
      });
      setStaffAndUsers(response.data);
      e.target.reset(); // Clear the form
      setError(null); // Clear any previous errors
    } catch (err) {
      setError("Failed to add staff.");
      console.error("Error adding staff:", err);
    }
  };
  const handleUpdateRole = async (userId, newRole) => {
    try {
      // FIX: Use the 'token' key
      const token = localStorage.getItem("token");
      await axios.put(
        `${API_BASE_URL}/admin/users/${userId}/role`,
        { role: newRole },
        {
          headers: { "x-auth-token": token },
        }
      );
      const response = await axios.get(`${API_BASE_URL}/users`);
      setStaffAndUsers(response.data);
    } catch (err) {
      setError("Failed to update role.");
      console.error("Error updating role:", err);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      // FIX: Use the 'token' key
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/admin/users/${userId}`, {
        headers: { "x-auth-token": token },
      });
      const response = await axios.get(`${API_BASE_URL}/users`);
      setStaffAndUsers(response.data);
    } catch (err) {
      setError("Failed to delete user.");
      console.error("Error deleting user:", err);
    }
  };

  // ... The rest of your component's rendering logic is unchanged ...

  const renderDashboard = () => (
    <div className="dashboard-grid">
      <div
        className="dashboard-card"
        onClick={() => setCurrentView("manageRooms")}
      >
        <FaBed className="card-icon" />
        <h3 className="card-title">Manage Hotel Rooms</h3>
        <p className="card-subtitle">Add, edit, or delete room listings.</p>
      </div>
      <div
        className="dashboard-card"
        onClick={() => setCurrentView("manageStaffAndUsers")}
      >
        <FaUsers className="card-icon" />
        <h3 className="card-title">Manage Staff & Users</h3>
        <p className="card-subtitle">
          View and manage staff accounts and user roles.
        </p>
      </div>
      <div
        className="dashboard-card"
        onClick={() => setCurrentView("viewFeedback")}
      >
        <FaStar className="card-icon" />
        <h3 className="card-title">View Feedback</h3>
        <p className="card-subtitle">Review customer feedback and ratings.</p>
      </div>
    </div>
  );

  const renderManageRooms = () => (
    <div className="admin-content-section">
      <button className="back-btn" onClick={() => setCurrentView("dashboard")}>
        &larr; Back to Dashboard
      </button>
      <h2 className="section-heading">Manage Hotel Rooms</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="content-grid">
        <div className="card form-card">
          <h3 className="form-heading">
            <FaPlus /> Add New Room
          </h3>
          <form onSubmit={handleAddRoom}>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input type="text" id="title" name="title" required />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                rows="4"
                required
                placeholder="Enter room description..."
                style={{ marginBottom: "16px" }}
              ></textarea>
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="price">Price (BDT)</label>
                <input type="number" id="price" name="price" required />
              </div>
              <div className="form-group">
                <label htmlFor="roomType">Room Type</label>
                <select id="roomType" name="roomType">
                  <option value="Single">Single</option>
                  <option value="Double">Double</option>
                  <option value="Suite">Suite</option>
                </select>
              </div>
            </div>
            <div className="form-group-row">
              <div className="form-group">
                <label htmlFor="beds">Beds</label>
                <input type="number" id="beds" name="beds" required />
              </div>
              <div className="form-group">
                <label htmlFor="guests">Guests</label>
                <input type="number" id="guests" name="guests" required />
              </div>
            </div>
            <div className="form-group">
              <label>Amenities</label>
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" name="amenities" value="AC" /> AC
                </label>
                <label>
                  <input type="checkbox" name="amenities" value="Breakfast" />{" "}
                  Breakfast
                </label>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input type="text" id="image" name="image" required />
            </div>
            <button type="submit" className="btn btn-primary">
              Add Room
            </button>
          </form>
        </div>
        <div className="card list-card">
          <h3 className="list-heading">Existing Rooms ({rooms.length})</h3>
          <ul className="item-list">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <li key={room._id} className="list-item room-item">
                  <div className="room-info-card">
                    <img
                      src={room.image || "https://via.placeholder.com/100x80"}
                      alt={room.title}
                      className="room-image"
                    />
                    <div className="room-details">
                      <span className="item-text">{room.title}</span>
                      <span className="item-price"> BDT {room.price}</span>
                    </div>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={() => handleDeleteRoom(room._id)}
                  >
                    <FaTrash />
                  </button>
                </li>
              ))
            ) : (
              <p className="no-items">No rooms found. Add a new one!</p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );

const renderManageStaffAndUsers = () => (
    <div className="admin-content-section">
      <button className="back-btn" onClick={() => setCurrentView("dashboard")}>
        &larr; Back to Dashboard
      </button>
      <h2 className="section-heading">Manage Staff & Users</h2>
      {loading && <p>Loading users...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="content-grid">
        <div className="card form-card">
          <h3 className="form-heading">
            <FaPlus /> Add New Staff
          </h3>
          <form onSubmit={handleAddStaff}>
            {/* NEW: Username Field */}
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" id="username" name="username" required />
            </div>

            <div className="form-group">
              <label htmlFor="email">Staff Email</label>
              <input type="email" id="email" name="email" required />
            </div>

            {/* NEW: Password Field */}
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" name="password" required />
            </div>

            {/* The 'role' is now hardcoded to 'staff' on the backend, so this is not needed */}
            {/*
            <div className="form-group">
              <label htmlFor="role">Role</label>
              <select id="role" name="role">
                <option value="staff">Staff</option>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            */}
            <button type="submit" className="btn btn-primary">
              Add Staff
            </button>
          </form>
        </div>

        <div className="card list-card">
          <h3 className="list-heading">
            User and Staff List ({staffAndUsers.length})
          </h3>
          <ul className="item-list">
            {staffAndUsers.length > 0 ? (
              staffAndUsers.map((user) => (
                <li key={user._id} className="list-item user-item">
                  <div className="user-info">
                    <span className="user-email">{user.username} ({user.email})</span>
                    <span className={`user-role ${user.role}`}>
                      {user.role}
                    </span>
                  </div>
                  <div className="user-actions">
                    <select
                      className="role-select"
                      value={user.role}
                      onChange={(e) =>
                        handleUpdateRole(user._id, e.target.value)
                      }
                    >
                      <option value="user">User</option>
                      <option value="staff">Staff</option>
                      <option value="admin">Admin</option>
                    </select>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))
            ) : (
              <p className="no-items">
                No staff or users found.
              </p>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
  const renderViewFeedback = () => (
    <div className="admin-content-section">
      <button className="back-btn" onClick={() => setCurrentView("dashboard")}>
        &larr; Back to Dashboard
      </button>
      <h2 className="section-heading">Customer Feedback</h2>
      {loading && <p>Loading feedback...</p>}
      {error && <p className="error-message">{error}</p>}
      <div className="card list-card">
        <h3 className="list-heading">Feedback ({feedback.length})</h3>
        <ul className="item-list">
          {feedback.length > 0 ? (
            feedback.map((f) => (
              <li key={f._id} className="list-item feedback-item">
                <div className="feedback-details">
                  <p>
                    <strong>User:</strong> {f.user}
                  </p>
                  <p>
                    <strong>Rating:</strong> {f.rating} / 5
                  </p>
                  <p className="comment">"{f.comment}"</p>
                </div>
              </li>
            ))
          ) : (
            <p className="no-items">No feedback found.</p>
          )}
        </ul>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1 className="main-title">Admin Dashboard</h1>
        <p className="user-info">
          Welcome back!
          <button onClick={handleLogout} className="logout-btn">
            Log Out
          </button>
        </p>
      </header>

      {currentView === "dashboard" && renderDashboard()}
      {currentView === "manageRooms" && renderManageRooms()}
      {currentView === "manageStaffAndUsers" && renderManageStaffAndUsers()}
      {currentView === "viewFeedback" && renderViewFeedback()}
    </div>
  );
};

export default AdminPanel;