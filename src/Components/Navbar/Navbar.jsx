import React, { useState, useEffect } from 'react';
import './style.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa'; // FontAwesome icons
import axios from 'axios';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]); // To hold the search suggestions
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch coins for suggestions
  useEffect(() => {
    if (searchQuery.trim()) {
      const fetchSuggestions = async () => {
        setLoading(true);
        try {
          const response = await axios.get(
            `https://api.coingecko.com/api/v3/coins/markets`,
            {
              params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 5,
                page: 1,
                sparkline: false,
              },
            }
          );
          // Filter the coins based on the search query
          const filteredCoins = response.data.filter((coin) =>
            coin.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setSuggestions(filteredCoins);
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchSuggestions();
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  // Handle search query input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search click
  const handleSearchClick = () => {
    if (searchQuery.trim()) {
      navigate(`/coin/${searchQuery.toLowerCase()}`);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      handleSearchClick();
    }
  };

  // Handle suggestion click
  const handleSuggestionClick = (coinId) => {
    setSearchQuery('');
    setSuggestions([]);
    navigate(`/coin/${coinId.toLowerCase()}`); // Navigate to the coin detail page
  };

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
        <input
          type="text"
          className="search-bar"
          placeholder="Search Coin."
          value={searchQuery}
          onChange={handleSearchChange}
          onKeyDown={handleKeyPress}  // Listen for Enter key press
        />
        <button className="search-button" onClick={handleSearchClick}>
          <FaSearch size={20} />
        </button>

        {/* Suggestions Dropdown */}
        {searchQuery && suggestions.length > 0 && (
          <div className="suggestions-dropdown">
            {loading ? (
              <p>Loading...</p>
            ) : (
              suggestions.map((coin) => (
                <div
                  key={coin.id}
                  className="suggestion-item"
                  onClick={() => handleSuggestionClick(coin.id)} // Handle suggestion click
                >
                  <img src={coin.image} alt={coin.name} width="20" />
                  <span>{coin.name} ({coin.symbol.toUpperCase()})</span>
                </div>
              ))
            )}
          </div>
        )}
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
