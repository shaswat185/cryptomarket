import React from 'react';
import './style.css'
import { Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // FontAwesome icons

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo or Home Button */}
      <div className="logo">
        <Link to="/" className="logo-link">
          
          <span>CryptoMarket</span>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="search-container">
        <input type="text" className="search-bar" placeholder="Search Coin." />
        <button className="search-button">
          <FaSearch size={20} />
        </button>
      </div>

      {/* Navigation Links */}
      <ul className="nav-links">
        <li>
          <Link to="/" className="nav-link">Home</Link>
        </li>
        <li>
          <Link to="/market" className="nav-link">Market</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;




