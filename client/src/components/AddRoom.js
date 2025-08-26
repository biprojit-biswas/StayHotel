// client/src/components/AddRoom.js
import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddRoom = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    image: '',
    roomType: '',
    beds: '',
    guests: '',
    amenities: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      setMessage('You must be logged in to add a room.');
      return;
    }

    try {
      const roomData = {
        ...formData,
        price: Number(formData.price),
        beds: Number(formData.beds),
        guests: Number(formData.guests),
        amenities: formData.amenities.split(',').map(s => s.trim()),
      };
      const response = await axios.post('http://localhost:5000/api/rooms/add', roomData, {
        headers: {
          'x-auth-token': token,
        },
      });
      setMessage(response.data.message);
      setFormData({
        title: '',
        description: '',
        price: '',
        image: '',
        roomType: '',
        beds: '',
        guests: '',
        amenities: '',
      });
    } catch (err) {
      setMessage(err.response.data.error || err.response.data.msg);
    }
  };

  return (
    <div className="container card">
      <h2 className="text-center">Add a New Room</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
        </div>
        <div className="form-group">
          <label>Price (BDT)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Image URL</label>
          <input type="text" name="image" value={formData.image} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Room Type (Single, Double, Suite)</label>
          <input type="text" name="roomType" value={formData.roomType} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Number of Beds</label>
          <input type="number" name="beds" value={formData.beds} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Max Guests</label>
          <input type="number" name="guests" value={formData.guests} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Amenities (comma-separated)</label>
          <input type="text" name="amenities" value={formData.amenities} onChange={handleChange} placeholder="e.g., WiFi, AC, Breakfast" required />
        </div>
        <button type="submit" className="btn btn-primary">Add Room</button>
      </form>
      {message && <p className="text-center" style={{ marginTop: '20px' }}>{message}</p>}
    </div>
  );
};

export default AddRoom;