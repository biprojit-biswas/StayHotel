// // client/src/pages/ManageStaff.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import '../App.css';

// const ManageStaff = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   const fetchUsers = async () => {
//     const token = localStorage.getItem('admin-token');
//     try {
//       const response = await axios.get('http://localhost:5000/api/admin/users', {
//         headers: { 'x-auth-token': token },
//       });
//       setUsers(response.data);
//     } catch (err) {
//       setMessage('Failed to fetch users.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   if (loading) return <p className="text-center">Loading users...</p>;

//   return (
//     <div className="container admin-list-container">
//       <div className="admin-header">
//         <h2>Manage Staff & Users</h2>
//         <Link to="/admin/add-staff" className="btn btn-add">Add New Staff</Link>
//       </div>
      
//       {message && <p className="text-center message">{message}</p>}

//       <div className="admin-users-grid">
//         {users.map(user => (
//           <div key={user._id} className="admin-user-card card">
//             <div className="user-avatar">
//               <i className="fas fa-user-circle"></i>
//             </div>
//             <div className="user-details">
//               <h4>{user.username}</h4>
//               <p>{user.email}</p>
//               <p className={`user-role ${user.isAdmin ? 'role-admin' : 'role-user'}`}>
//                 {user.isAdmin ? 'Admin' : 'User'}
//               </p>
//             </div>
//             <div className="admin-user-actions">
//               <button className="btn btn-edit">Edit Role</button>
//               <button className="btn btn-delete">Delete</button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ManageStaff;

// client/src/pages/ManageStaff.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // NEW: Imported Link for the 'Add Staff' button
import axios from 'axios';
import '../App.css';

const ManageStaff = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  
  // NEW: State to track which user is being edited
  const [editingUserId, setEditingUserId] = useState(null);
  const [selectedRole, setSelectedRole] = useState('');

  const fetchUsers = async () => {
    setLoading(true);
    // CHANGED: Using 'token' to be consistent with the rest of the app
    const token = localStorage.getItem('token'); 
    try {
      // CHANGED: Endpoint might be just /api/users, adjust if necessary
      const response = await axios.get('http://localhost:5000/api/users', { 
        headers: { 'x-auth-token': token },
      });
      setUsers(response.data);
    } catch (err) {
      setMessage('Failed to fetch users.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // NEW: Function to handle starting the edit process
  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setSelectedRole(user.role);
  };

  // NEW: Function to save the role change
  const handleRoleChange = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/admin/users/${userId}/role`, 
        { role: selectedRole },
        { headers: { 'x-auth-token': token } }
      );
      setMessage('User role updated successfully!');
      setEditingUserId(null); // Exit editing mode
      fetchUsers(); // Refresh the user list
    } catch (err) {
      setMessage('Failed to update role.');
      console.error(err);
    }
  };

  if (loading) return <p className="text-center">Loading users...</p>;

  return (
    // CHANGED: Using new, more specific class names for styling
    <div className="manage-staff-container">
      <div className="staff-header">
        <h2>Manage Staff & Users</h2>
        <Link to="/admin/add-staff" className="btn-add-staff">
          <i className="fas fa-plus"></i> Add New Staff
        </Link>
      </div>
      
      {message && <p className="text-center message">{message}</p>}

      <div className="users-grid">
        {users.map(user => (
          <div key={user._id} className="user-card">
            <div className="user-card-details">
              <h4>{user.username}</h4>
              <p>{user.email}</p>
            </div>

            <div className="user-card-role">
              {editingUserId === user._id ? (
                // NEW: Show dropdown when editing
                <select 
                  value={selectedRole} 
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="role-select"
                >
                  <option value="user">User</option>
                  <option value="staff">Staff</option>
                  <option value="admin">Admin</option>
                </select>
              ) : (
                // CHANGED: Display user.role directly with new badge styling
                <span className={`role-badge ${user.role}`}>{user.role}</span>
              )}
            </div>

            <div className="user-card-actions">
              {editingUserId === user._id ? (
                // NEW: Show Save/Cancel buttons when editing
                <>
                  <button className="action-btn save" onClick={() => handleRoleChange(user._id)}>Save</button>
                  <button className="action-btn cancel" onClick={() => setEditingUserId(null)}>Cancel</button>
                </>
              ) : (
                // Show Edit/Delete buttons normally
                <>
                  <button className="action-btn edit" onClick={() => handleEditClick(user)}>Edit Role</button>
                  <button className="action-btn delete">Delete</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageStaff;