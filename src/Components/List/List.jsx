import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css'; // Import your updated CSS

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

  const formatPercentageChange = (percent) => {
    return percent !== undefined
      ? percent > 0
        ? `+${percent.toFixed(2)}%`
        : `${percent.toFixed(2)}%`
      : '--';
  };

  const formatPriceChange = (priceChange) => {
    return priceChange !== undefined
      ? priceChange > 0
        ? `+${formatCurrency(priceChange)}`
        : formatCurrency(priceChange)
      : '--';
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
          {/* Header Row */}
          <div className="crypto-table-header">
            <div className="crypto-table-cell">Name</div>
            <div className="crypto-table-cell">Price</div>
            <div className="crypto-table-cell">24h Change</div>
            <div className="crypto-table-cell">Volume</div>
            <div className="crypto-table-cell">Market Cap</div>
          </div>

          {/* Data Rows */}
          {coins.map((coin) => {
            const priceChange = coin.price_change_24h;
            return (
              <div key={coin.id} className="crypto-table-row">
                <div className="crypto-table-cell">
                  <img src={coin.image} alt={coin.name} width="20" className="crypto-image" />
                  {coin.name} ({coin.symbol.toUpperCase()})
                </div>
                <div className="crypto-table-cell">{formatCurrency(coin.current_price)}</div>
                <div className="crypto-table-cell">
                  <span
                    className={`crypto-price-change-text ${
                      priceChange > 0 ? 'positive' : 'negative'
                    }`}
                  >
                    {formatPriceChange(priceChange)}
                  </span>
                  <span
                    className={`crypto-percentage ${
                      coin.price_change_percentage_24h > 0 ? 'positive' : 'negative'
                    }`}
                  >
                    {formatPercentageChange(coin.price_change_percentage_24h)}
                  </span>
                </div>
                <div className="crypto-table-cell">{formatCurrency(coin.total_volume)}</div>
                <div className="crypto-table-cell">{formatCurrency(coin.market_cap)}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CryptoList;
