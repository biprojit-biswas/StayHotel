// // // client/src/pages/AdminDashboard.js
// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import '../App.css';

// // const AdminDashboard = () => {
// //   const [staffData, setStaffData] = useState({ username: '', email: '', password: '' });
// //   const [fundsData, setFundsData] = useState({ userId: '', amount: '' });
// //   const [message, setMessage] = useState('');

// //   const handleStaffChange = (e) => {
// //     setStaffData({ ...staffData, [e.target.name]: e.target.value });
// //   };

// //   const handleFundsChange = (e) => {
// //     setFundsData({ ...fundsData, [e.target.name]: e.target.value });
// //   };

// //   const handleAddStaff = async (e) => {
// //     e.preventDefault();
// //     const token = localStorage.getItem('token');
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/admin/staff/add', staffData, {
// //         headers: { 'x-auth-token': token },
// //       });
// //       setMessage(response.data.msg);
// //     } catch (err) {
// //       setMessage(err.response?.data.msg || 'Failed to add staff.');
// //     }
// //   };

// //   const handleAssignFunds = async (e) => {
// //     e.preventDefault();
// //     const token = localStorage.getItem('token');
// //     try {
// //       const response = await axios.post('http://localhost:5000/api/admin/client/assign-funds', fundsData, {
// //         headers: { 'x-auth-token': token },
// //       });
// //       setMessage(response.data.msg);
// //     } catch (err) {
// //       setMessage(err.response?.data.msg || 'Failed to assign funds.');
// //     }
// //   };

// //   return (
// //     <div className="container admin-dashboard-container">
// //       <h1 className="admin-title">Admin Dashboard</h1>

// //       <div className="admin-grid">
// //         <div className="admin-section card">
// //           <h2 className="section-title">Add New Staff</h2>
// //           <form onSubmit={handleAddStaff}>
// //             <div className="form-group">
// //               <label>Username</label>
// //               <input type="text" name="username" value={staffData.username} onChange={handleStaffChange} required />
// //             </div>
// //             <div className="form-group">
// //               <label>Email</label>
// //               <input type="email" name="email" value={staffData.email} onChange={handleStaffChange} required />
// //             </div>
// //             <div className="form-group">
// //               <label>Password</label>
// //               <input type="password" name="password" value={staffData.password} onChange={handleStaffChange} required />
// //             </div>
// //             <button type="submit" className="btn btn-primary">Add Staff</button>
// //           </form>
// //         </div>

// //         <div className="admin-section card">
// //           <h2 className="section-title">Assign Funds to Client</h2>
// //           <form onSubmit={handleAssignFunds}>
// //             <div className="form-group">
// //               <label>Client User ID</label>
// //               <input type="text" name="userId" value={fundsData.userId} onChange={handleFundsChange} required />
// //             </div>
// //             <div className="form-group">
// //               <label>Amount (BDT)</label>
// //               <input type="number" name="amount" value={fundsData.amount} onChange={handleFundsChange} required />
// //             </div>
// //             <button type="submit" className="btn btn-primary">Assign Funds</button>
// //           </form>
// //         </div>
// //       </div>
      
// //       {message && <p className="text-center message">{message}</p>}
// //     </div>
// //   );
// // };

// // export default AdminDashboard;






// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const AdminDashboard = () => {
//   const [currentView, setCurrentView] = useState('dashboard');
//   const [rooms, setRooms] = useState([]);
//   const [newRoomData, setNewRoomData] = useState({
//     title: '',
//     description: '',
//     price: 0,
//     roomType: 'Single',
//     amenities: [],
//     image: '',
//     beds: 1,
//     guests: 1,
//     availability: true,
//   });
//   const [feedback, setFeedback] = useState([]);
//   const [staffAndUsers, setStaffAndUsers] = useState([]);

//   useEffect(() => {
//     const fetchAllData = async () => {
//       const token = localStorage.getItem('token');
//       try {
//         const roomsResponse = await axios.get('http://localhost:5000/api/rooms', {
//           headers: { 'x-auth-token': token },
//         });
//         setRooms(roomsResponse.data);
//       } catch (err) {
//         console.error('Failed to fetch rooms:', err);
//       }
      
//       const dummyStaffAndUsers = [
//         { id: '1', username: 'admin_user', role: 'admin' },
//         { id: '2', username: 'staff_member', role: 'staff' },
//         { id: '3', username: 'regular_user', role: 'user' },
//       ];
//       setStaffAndUsers(dummyStaffAndUsers);
      
//       const dummyFeedback = [
//         { id: 'f1', user: 'guest123', rating: 5, comment: 'Great service, loved the room!' },
//         { id: 'f2', user: 'traveller_x', rating: 4, comment: 'The breakfast was excellent.' },
//       ];
//       setFeedback(dummyFeedback);
//     };
    
//     fetchAllData();
//   }, []);

//   const handleRoomFormChange = (e) => {
//     setNewRoomData({ ...newRoomData, [e.target.name]: e.target.value });
//   };
  
//   const handleRoomAmenitiesChange = (e) => {
//     const { value, checked } = e.target;
//     setNewRoomData(prev => ({
//       ...prev,
//       amenities: checked
//         ? [...prev.amenities, value]
//         : prev.amenities.filter(amenity => amenity !== value),
//     }));
//   };

//   const handleAddRoom = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.post('http://localhost:5000/api/rooms', newRoomData, {
//         headers: { 'x-auth-token': token },
//       });
//       setRooms([...rooms, response.data]);
//       // Use a custom message box instead of alert()
//       alert('Room added successfully!'); 
//       setNewRoomData({
//         title: '',
//         description: '',
//         price: 0,
//         roomType: 'Single',
//         amenities: [],
//         image: '',
//         beds: 1,
//         guests: 1,
//         availability: true,
//       });
//     } catch (err) {
//       // Use a custom message box instead of alert()
//       alert('Failed to add room.');
//       console.error('Error adding room:', err);
//     }
//   };

//   const handleDeleteRoom = async (roomId) => {
//     const token = localStorage.getItem('token');
//     try {
//       await axios.delete(`http://localhost:5000/api/rooms/${roomId}`, {
//         headers: { 'x-auth-token': token },
//       });
//       setRooms(rooms.filter(room => room._id !== roomId));
//       // Use a custom message box instead of alert()
//       alert('Room deleted successfully!');
//     } catch (err) {
//       // Use a custom message box instead of alert()
//       alert('Failed to delete room.');
//       console.error('Error deleting room:', err);
//     }
//   };

//   const renderDashboard = () => (
//     <div className="flex flex-col md:flex-row justify-center items-center gap-6 mt-8">
//       <div 
//         className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer transition-transform transform hover:scale-105"
//         onClick={() => setCurrentView('manageRooms')}
//       >
//         <h2 className="text-xl font-bold text-gray-800">Manage Hotel Rooms</h2>
//         <p className="text-gray-600 mt-2">Add, edit, or delete room listings.</p>
//       </div>
//       <div 
//         className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer transition-transform transform hover:scale-105"
//         onClick={() => setCurrentView('manageStaffAndUsers')}
//       >
//         <h2 className="text-xl font-bold text-gray-800">Manage Staff & Users</h2>
//         <p className="text-gray-600 mt-2">View and manage staff accounts and user roles.</p>
//       </div>
//       <div 
//         className="w-full md:w-1/3 bg-white rounded-xl shadow-lg p-6 text-center cursor-pointer transition-transform transform hover:scale-105"
//         onClick={() => setCurrentView('viewFeedback')}
//       >
//         <h2 className="text-xl font-bold text-gray-800">View Feedback</h2>
//         <p className="text-gray-600 mt-2">Review customer feedback and ratings.</p>
//       </div>
//     </div>
//   );

//   const renderManageRooms = () => (
//     <div className="manage-rooms-container p-6 bg-gray-100 rounded-lg mt-8 shadow-inner">
//       <button 
//         className="bg-gray-500 text-white rounded-md px-4 py-2 hover:bg-gray-600 mb-6 transition-colors" 
//         onClick={() => setCurrentView('dashboard')}
//       >
//         Back to Dashboard
//       </button>
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Hotel Rooms</h2>
      
//       <div className="add-room-form bg-white rounded-xl shadow-lg p-6 mb-8">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">Add New Room</h3>
//         <form onSubmit={handleAddRoom}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">Title</label>
//             <input 
//               type="text" 
//               name="title" 
//               value={newRoomData.title} 
//               onChange={handleRoomFormChange} 
//               required 
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">Description</label>
//             <textarea 
//               name="description" 
//               value={newRoomData.description} 
//               onChange={handleRoomFormChange} 
//               required
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             ></textarea>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">Price (BDT)</label>
//             <input 
//               type="number" 
//               name="price" 
//               value={newRoomData.price} 
//               onChange={handleRoomFormChange} 
//               required 
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">Room Type</label>
//             <select 
//               name="roomType" 
//               value={newRoomData.roomType} 
//               onChange={handleRoomFormChange}
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             >
//               <option value="Single">Single</option>
//               <option value="Double">Double</option>
//               <option value="Suite">Suite</option>
//             </select>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">Amenities</label>
//             <div className="flex gap-4">
//               <label className="flex items-center">
//                 <input 
//                   type="checkbox" 
//                   name="AC" 
//                   value="AC" 
//                   checked={newRoomData.amenities.includes('AC')} 
//                   onChange={handleRoomAmenitiesChange} 
//                   className="mr-2"
//                 /> AC
//               </label>
//               <label className="flex items-center">
//                 <input 
//                   type="checkbox" 
//                   name="Breakfast" 
//                   value="Breakfast" 
//                   checked={newRoomData.amenities.includes('Breakfast')} 
//                   onChange={handleRoomAmenitiesChange} 
//                   className="mr-2"
//                 /> Breakfast
//               </label>
//             </div>
//           </div>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-medium mb-1">Image URL</label>
//             <input 
//               type="text" 
//               name="image" 
//               value={newRoomData.image} 
//               onChange={handleRoomFormChange} 
//               required 
//               className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//             />
//           </div>
//           <button 
//             type="submit" 
//             className="w-full bg-blue-500 text-white rounded-md py-2 font-semibold hover:bg-blue-600 transition-colors"
//           >
//             Add Room
//           </button>
//         </form>
//       </div>
      
//       <div className="room-list bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">Existing Rooms</h3>
//         <div className="divide-y divide-gray-200">
//           {rooms.length > 0 ? (
//             rooms.map(room => (
//               <div key={room._id} className="flex justify-between items-center py-3">
//                 <span className="text-gray-800">{room.title} - BDT {room.price}</span>
//                 <button 
//                   className="bg-red-500 text-white rounded-md px-3 py-1 text-sm hover:bg-red-600 transition-colors" 
//                   onClick={() => handleDeleteRoom(room._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center">No rooms found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   const renderManageStaffAndUsers = () => (
//     <div className="manage-users-container p-6 bg-gray-100 rounded-lg mt-8 shadow-inner">
//       <button 
//         className="bg-gray-500 text-white rounded-md px-4 py-2 hover:bg-gray-600 mb-6 transition-colors" 
//         onClick={() => setCurrentView('dashboard')}
//       >
//         Back to Dashboard
//       </button>
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Manage Staff & Users</h2>
      
//       <div className="list-group bg-white rounded-xl shadow-lg p-6">
//         <h3 className="text-xl font-semibold text-gray-700 mb-4">User and Staff List</h3>
//         <div className="divide-y divide-gray-200">
//           {staffAndUsers.length > 0 ? (
//             staffAndUsers.map(user => (
//               <div key={user.id} className="flex justify-between items-center py-3">
//                 <span className="text-gray-800">{user.username} ({user.role})</span>
//                 <div className="flex gap-2">
//                   <button className="bg-yellow-500 text-white rounded-md px-3 py-1 text-sm hover:bg-yellow-600 transition-colors">Change Role</button>
//                   <button className="bg-red-500 text-white rounded-md px-3 py-1 text-sm hover:bg-red-600 transition-colors">Delete</button>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center">No staff or users found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   const renderViewFeedback = () => (
//     <div className="view-feedback-container p-6 bg-gray-100 rounded-lg mt-8 shadow-inner">
//       <button 
//         className="bg-gray-500 text-white rounded-md px-4 py-2 hover:bg-gray-600 mb-6 transition-colors" 
//         onClick={() => setCurrentView('dashboard')}
//       >
//         Back to Dashboard
//       </button>
//       <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Feedback</h2>
      
//       <div className="list-group bg-white rounded-xl shadow-lg p-6">
//         <div className="divide-y divide-gray-200">
//           {feedback.length > 0 ? (
//             feedback.map(f => (
//               <div key={f.id} className="py-3">
//                 <p className="text-gray-800"><strong>From:</strong> {f.user}</p>
//                 <p className="text-gray-800"><strong>Rating:</strong> {f.rating} / 5</p>
//                 <p className="text-gray-600 mt-1"><strong>Comment:</strong> {f.comment}</p>
//               </div>
//             ))
//           ) : (
//             <p className="text-gray-500 text-center">No feedback found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="bg-gray-200 min-h-screen p-8 font-sans">
//       <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-8">Admin Dashboard</h1>
      
//       {currentView === 'dashboard' && renderDashboard()}
//       {currentView === 'manageRooms' && renderManageRooms()}
//       {currentView === 'manageStaffAndUsers' && renderManageStaffAndUsers()}
//       {currentView === 'viewFeedback' && renderViewFeedback()}
      
//     </div>
//   );
// };

// export default AdminDashboard;












































import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUserPlus, FaMoneyBillWave } from 'react-icons/fa'; // Icons for dashboard cards

const AdminDashboard = () => {
  // This component shows the detailed view for adding staff and assigning funds.
  // This is a simplified version for demonstration.
  const [message, setMessage] = useState('');

  const handleAddStaff = (e) => {
    e.preventDefault();
    console.log('Adding staff...');
    setMessage('Staff added successfully!');
    e.target.reset();
  };

  const handleAssignFunds = (e) => {
    e.preventDefault();
    console.log('Assigning funds...');
    setMessage('Funds assigned successfully!');
    e.target.reset();
  };

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="admin-content-section">
      <Link to="/" className="back-btn">&larr; Back to Dashboard</Link>
      <h2 className="section-heading">Detailed Admin Actions</h2>
      <div className="content-grid">
        <div className="card form-card">
          <h3 className="form-heading"><FaUserPlus /> Add New Staff</h3>
          <form onSubmit={handleAddStaff}>
            <div className="form-group">
              <label htmlFor="staff-username">Username</label>
              <input type="text" id="staff-username" name="username" required />
            </div>
            <div className="form-group">
              <label htmlFor="staff-email">Email</label>
              <input type="email" id="staff-email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="staff-password">Password</label>
              <input type="password" id="staff-password" name="password" required />
            </div>
            <button type="submit" className="btn btn-primary">Add Staff</button>
          </form>
        </div>

        <div className="card form-card">
          <h3 className="form-heading"><FaMoneyBillWave /> Assign Funds to Client</h3>
          <form onSubmit={handleAssignFunds}>
            <div className="form-group">
              <label htmlFor="client-id">Client User ID</label>
              <input type="text" id="client-id" name="userId" required />
            </div>
            <div className="form-group">
              <label htmlFor="amount">Amount (USD)</label>
              <input type="number" id="amount" name="amount" required />
            </div>
            <button type="submit" className="btn btn-primary">Assign Funds</button>
          </form>
        </div>
      </div>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
};

export default AdminDashboard;
