// client/src/pages/HomePage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const HomePage = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({
    'Single': false,
    'Double': false,
    'Suite': false,
    'AC': false,
    'Breakfast': false,
  });
  const [sortOption, setSortOption] = useState('Popularity');
  const [searchTerm, setSearchTerm] = useState('');
  const isAuthenticated = !!localStorage.getItem('token');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/rooms');
        setRooms(response.data);
      } catch (err) {
        console.error('Error fetching rooms:', err);
      }
    };
    fetchRooms();
  }, []);

  const handleFilterChange = (event) => {
    const { id, checked } = event.target;
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [id]: checked,
    }));
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };
  
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredRooms = rooms.filter(room => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();

    const matchesSearchTerm = 
      room.title.toLowerCase().includes(lowerCaseSearchTerm) ||
      room.description.toLowerCase().includes(lowerCaseSearchTerm) ||
      room.roomType.toLowerCase().includes(lowerCaseSearchTerm) ||
      room.amenities.some(amenity => amenity.toLowerCase().includes(lowerCaseSearchTerm));
      
    const activeFilters = Object.keys(selectedFilters).filter(key => selectedFilters[key]);
    const matchesCheckboxFilters = () => {
        if (activeFilters.length === 0) {
            return true;
        }
        const typeFilters = ['Single', 'Double', 'Suite'].filter(type => selectedFilters[type]);
        const amenityFilters = ['AC', 'Breakfast'].filter(amenity => selectedFilters[amenity]);
        
        const matchesType = typeFilters.length === 0 || typeFilters.includes(room.roomType);
        const matchesAmenities = amenityFilters.length === 0 || amenityFilters.every(amenity => room.amenities.includes(amenity));
        
        return matchesType && matchesAmenities;
    };

    return matchesSearchTerm && matchesCheckboxFilters();
  });

  const sortedRooms = [...filteredRooms].sort((a, b) => {
    if (sortOption === 'Price (Low to High)') {
      return a.price - b.price;
    }
    if (sortOption === 'Price (High to Low)') {
      return b.price - a.price;
    }
    return 0;
  });

  const handleSignOut = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  
  return (
    <div className="home-container">
      <div className="hero-background"></div>
      <nav className="navbar">
        <div className="navbar-left">
          <div className="navbar-logo">StayHotel</div>
          <div className="navbar-search">
            <input 
              type="text" 
              placeholder="Search rooms..." 
              value={searchTerm} 
              onChange={handleSearchChange} 
              className="search-input"
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className="navbar-links">
          <Link to="/flights" className="nav-link">Flight</Link>
          <a href="/hotel" className="nav-link">Hotel</a>
          <a href="/tours" className="nav-link">Tour</a>
          <a href="/transportation" className="nav-link">Transportation</a>
          <a href="/gifts" className="nav-link">Gift Card</a>
          {isAuthenticated && (
            <Link to="/mybookings" className="nav-link">My Bookings</Link>
          )}
        </div>
        <div className="navbar-auth">
          {isAuthenticated ? (
            <button className="btn-sign-in" onClick={handleSignOut}>Sign Out</button>
          ) : (
            <Link to="/auth" className="btn-sign-in">Sign In</Link>
          )}
        </div>
      </nav>
      
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Your Perfect Getaway Awaits!</h1>
          <p className="hero-subtitle">Discover our exclusive rooms designed for your comfort.</p>
          <Link to="/rooms" className="btn-discover">Explore Our Rooms</Link>
        </div>
      </div>
      
      <div className="content-area">
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
        <div className="results-section">
          <div className="results-header">
            <p>{sortedRooms.length} rooms found</p>
            <select className="sort-by" value={sortOption} onChange={handleSortChange}>
              <option>Popularity</option>
              <option>Price (Low to High)</option>
              <option>Price (High to Low)</option>
            </select>
          </div>
          {sortedRooms.length > 0 ? (
            sortedRooms.map(room => (
              <div key={room._id} className="room-card card">
                <img src={room.image} alt={room.title} className="room-image" />
                <div className="room-info">
                  <h4 className="room-title">{room.title}</h4>
                  <p className="room-location"><i className="fas fa-bed"></i> {room.beds} Beds | <i className="fas fa-user"></i> {room.guests} Guests</p>
                  {room.availability ? (
                    <p className="room-availability">Available</p>
                  ) : (
                    <p className="room-unavailable">Unavailable</p>
                  )}
                  <div className="room-amenities">
                    {room.amenities.map(amenity => (
                      <span key={amenity}>
                        <i className={`fas fa-${amenity.toLowerCase().replace(' ', '-')}`}></i> {amenity}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="room-price-booking">
                  <p className="price-from">From</p>
                  <p className="price">BDT {room.price} <span className="price-per-night">/ night</span></p>
                  <Link to={`/book/${room._id}`} className="btn-select">Book Now</Link>
                </div>
              </div>
            ))
          ) : (
            <div className="no-rooms-found">
              <p>No rooms found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;