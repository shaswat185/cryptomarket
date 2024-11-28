import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './style.css';


const CoinDetail = () => {
  const { coinId } = useParams();  // Extract coinId from the URL
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCoinDetail = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`);
        setCoin(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching coin details:', error);
        setLoading(false);
      }
    };

    fetchCoinDetail();
  }, [coinId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!coin) {
    return <p>Coin not found. Please try a valid coin ID.</p>;
  }
  

  return (
    <div className="coin-detail-container container my-5">
      <h1>{coin.name} ({coin.symbol.toUpperCase()})</h1>
      <img src={coin.image.large} alt={coin.name} width="200" />
      <p><strong>Current Price:</strong> ${coin.market_data.current_price.usd}</p>
      <p><strong>Market Cap:</strong> ${coin.market_data.market_cap.usd}</p>
      <p><strong>24h Change:</strong> {coin.market_data.price_change_percentage_24h}%</p>
      <p><strong>Volume:</strong> ${coin.market_data.total_volume.usd}</p>
      <p><strong>Circulating Supply:</strong> {coin.market_data.circulating_supply}</p>
      <p><strong>Description:</strong> {coin.description.en}</p>
    </div>
  );
};

export default CoinDetail;
