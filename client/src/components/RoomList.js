// client/src/components/RoomList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css'; 

const RoomList = () => {
  const [rooms, setRooms] = useState([]);
  const [reviews, setReviews] = useState({});
  const [selectedFilters, setSelectedFilters] = useState({
    'Single': false,
    'Double': false,
    'Suite': false,
    'AC': false,
    'Breakfast': false,
  });

  useEffect(() => {
    const fetchRoomsAndReviews = async () => {
      try {
        const roomsResponse = await axios.get('http://localhost:5000/api/rooms');
        setRooms(roomsResponse.data);

        const reviewsData = {};
        for (const room of roomsResponse.data) {
          const reviewsResponse = await axios.get(`http://localhost:5000/api/reviews/${room._id}`);
          reviewsData[room._id] = reviewsResponse.data;
        }
        setReviews(reviewsData);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchRoomsAndReviews();
  }, []);

  const handleFilterChange = (event) => {
    const { id, checked } = event.target;
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  const getAverageRating = (roomId) => {
    const roomReviews = reviews[roomId] || [];
    if (roomReviews.length === 0) return 'No ratings yet';
    const totalRating = roomReviews.reduce((sum, review) => sum + review.rating, 0);
    const average = (totalRating / roomReviews.length).toFixed(1);
    return `${average} (${roomReviews.length} reviews)`;
  };

  const filteredRooms = rooms.filter(room => {
    const activeFilters = Object.keys(selectedFilters).filter(key => selectedFilters[key]);
    if (activeFilters.length === 0) {
      return true;
    }
    
    const typeFilters = ['Single', 'Double', 'Suite'].filter(type => selectedFilters[type]);
    const amenityFilters = ['AC', 'Breakfast'].filter(amenity => selectedFilters[amenity]);
    
    const matchesType = typeFilters.length === 0 || typeFilters.includes(room.roomType);
    const matchesAmenities = amenityFilters.length === 0 || amenityFilters.every(amenity => room.amenities.includes(amenity));
    
    return matchesType && matchesAmenities;
  });

  return (
    <div className="room-list-container">
      <h2 className="room-list-title">Our Exclusive Rooms</h2>
      <div className="room-list-layout">
        <div className="filters-section card">
          <h3><i className="fas fa-filter"></i> Filters</h3>
          <p className="filter-group-title">Room Type</p>
          <div className="filter-option">
            <input type="checkbox" id="Single" checked={selectedFilters['Single']} onChange={handleFilterChange} />
            <label htmlFor="Single">Single</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="Double" checked={selectedFilters['Double']} onChange={handleFilterChange} />
            <label htmlFor="Double">Double</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="Suite" checked={selectedFilters['Suite']} onChange={handleFilterChange} />
            <label htmlFor="Suite">Suite</label>
          </div>
          
          <p className="filter-group-title">Amenities</p>
          <div className="filter-option">
            <input type="checkbox" id="AC" checked={selectedFilters['AC']} onChange={handleFilterChange} />
            <label htmlFor="AC">Air Conditioning</label>
          </div>
          <div className="filter-option">
            <input type="checkbox" id="Breakfast" checked={selectedFilters['Breakfast']} onChange={handleFilterChange} />
            <label htmlFor="Breakfast">Breakfast</label>
          </div>
        </div>
        
        <div className="room-grid">
          {filteredRooms.length > 0 ? (
            filteredRooms.map(room => (
              <div key={room._id} className="room-card-detailed">
                <img src={room.image} alt={room.title} className="room-image-detailed" />
                <div className="room-content">
                  <h4 className="room-title-detailed">{room.title}</h4>
                  <p className="room-price-detailed">BDT {room.price} / night</p>
                  <div className="rating-display">
                    <span role="img" aria-label="star">⭐</span> {getAverageRating(room._id)}
                  </div>
                  <p className="room-description-detailed">{room.description}</p>
                  <div className="room-specs">
                    <span><i className="fas fa-bed"></i> {room.beds} Beds</span>
                    <span><i className="fas fa-user"></i> {room.guests} Guests</span>
                  </div>
                  <div className="room-amenities-detailed">
                    {room.amenities.map(amenity => (
                      <span key={amenity} className="amenity-tag">{amenity}</span>
                    ))}
                  </div>
                  <Link to={`/book/${room._id}`} className="btn-book-now">Book Now</Link>
                  
                  {reviews[room._id] && reviews[room._id].length > 0 && (
                    <div className="reviews-list-section">
                      <h5>Customer Reviews:</h5>
                      {reviews[room._id].map(review => (
                        <div key={review._id} className="review-item-list">
                          <p><strong>{review.userId.username}</strong> rated it {review.rating}/5</p>
                          <p>"{review.comment}"</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="no-rooms-found-detailed">No rooms available matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomList;