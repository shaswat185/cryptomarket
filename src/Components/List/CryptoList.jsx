import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; 

const CryptoList = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoins = async () => {
      try {
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: 10,
              page: 1,
              sparkline: false,
            },
          }
        );
        setCoins(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coins:', error);
        setLoading(false);
      }
    };

    fetchCoins();
  }, []);

  const formatCurrency = (value) => {
    return value && value.toLocaleString() ? `$${value.toLocaleString()}` : '$0.00';
  };

  return (
    <div className="crypto-list-container">
      <h1 className="crypto-header">Top 10 Cryptocurrencies</h1>
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">Loading...</p>
        </div>
      ) : (
        <div className="crypto-table">
          <div className="crypto-table-header">
            <div className="crypto-table-cell">Name</div>
            <div className="crypto-table-cell">Price</div>
            <div className="crypto-table-cell">24h Change</div>
            <div className="crypto-table-cell">Volume</div>
            <div className="crypto-table-cell">Market Cap</div>
          </div>

          {coins.map((coin) => (
            <div key={coin.id} className="crypto-table-row">
              <div className="crypto-table-cell">
                <img src={coin.image} alt={coin.name} width="20" />
                {coin.name} ({coin.symbol.toUpperCase()})
              </div>
              <div className="crypto-table-cell">{formatCurrency(coin.current_price)}</div>
              <div className="crypto-table-cell">
                {coin.price_change_24h > 0 ? `+${coin.price_change_24h}` : coin.price_change_24h}
              </div>
              <div className="crypto-table-cell">{formatCurrency(coin.total_volume)}</div>
              <div className="crypto-table-cell">{formatCurrency(coin.market_cap)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoList;
