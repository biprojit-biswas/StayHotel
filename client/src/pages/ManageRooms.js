// client/src/pages/ManageRooms.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const ManageRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchRooms = async () => {
    const token = localStorage.getItem('admin-token');
    try {
      const response = await axios.get('http://localhost:5000/api/admin/rooms', {
        headers: { 'x-auth-token': token },
      });
      setRooms(response.data);
    } catch (err) {
      setMessage('Failed to fetch rooms.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  const handleDelete = async (roomId) => {
    const token = localStorage.getItem('admin-token');
    try {
      await axios.delete(`http://localhost:5000/api/admin/rooms/${roomId}`, {
        headers: { 'x-auth-token': token },
      });
      setMessage('Room deleted successfully!');
      fetchRooms(); // Refresh the list
    } catch (err) {
      setMessage('Failed to delete room.');
    }
  };

  if (loading) return <p className="text-center">Loading rooms...</p>;

  return (
    <div className="container admin-list-container">
      <div className="admin-header">
        <h2>Manage Hotel Rooms</h2>
        <Link to="/add-room" className="btn btn-add">Add New Room</Link>
      </div>
      
      {message && <p className="text-center message">{message}</p>}

      <div className="admin-rooms-grid">
        {rooms.map(room => (
          <div key={room._id} className="admin-room-card card">
            <img src={room.image} alt={room.title} className="admin-room-image" />
            <div className="admin-room-details">
              <h4>{room.title}</h4>
              <p><strong>Type:</strong> {room.roomType}</p>
              <p><strong>Price:</strong> BDT {room.price}</p>
              <div className="admin-room-actions">
                <button className="btn btn-edit">Edit</button>
                <button className="btn btn-delete" onClick={() => handleDelete(room._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageRooms;


