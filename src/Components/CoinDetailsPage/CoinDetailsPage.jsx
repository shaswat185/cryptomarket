import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import ShowMoreText from 'react-show-more-text';
import './style.css';

const CoinDetailsPage = () => {
  const { coinId } = useParams();
  const [coinDetails, setCoinDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const source = axios.CancelToken.source();
    const fetchCoinDetails = async () => {
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coinId}`, {
          params: { localization: false },
          cancelToken: source.token,
        });
        setCoinDetails(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled', err.message);
        } else {
          setError('Failed to load coin details. Please try again later.');
        }
      }
    };

    fetchCoinDetails();
    return () => source.cancel('Operation canceled by the user.');
  }, [coinId]);

  if (error) return <p className="error-message">{error}</p>;
  if (!coinDetails) return <p className="loading">Loading...</p>;

  return (
    <div className="coin-details-container">
      <div className="coin-header">
        <img
          src={coinDetails.image?.large || 'default-image.png'}
          alt={coinDetails.name ? `${coinDetails.name} logo` : 'Cryptocurrency logo'}
          className="coin-image"
        />
        <h1 className="coin-name">{coinDetails.name || 'Unknown Coin'}</h1>
      </div>

      <div className="coin-stats">
        <div className="stat-item">
          <h3>Price</h3>
          <p>
            ₹{coinDetails.market_data?.current_price?.inr
              ? coinDetails.market_data.current_price.inr.toLocaleString()
              : 'N/A'}
          </p>
        </div>
        <div className="stat-item">
          <h3>Circulating Supply</h3>
          <p>
            {coinDetails.market_data?.circulating_supply
              ? coinDetails.market_data.circulating_supply.toLocaleString()
              : 'N/A'}
          </p>
        </div>
        <div className="stat-item">
          <h3>Market Cap</h3>
          <p>
            ₹{coinDetails.market_data?.market_cap?.inr
              ? coinDetails.market_data.market_cap.inr.toLocaleString()
              : 'N/A'}
          </p>
        </div>
        <div className="stat-item">
          <h3>24h Change</h3>
          <p
            className={
              coinDetails.market_data?.price_change_percentage_24h > 0
                ? 'positive-change'
                : 'negative-change'
            }
          >
            {coinDetails.market_data?.price_change_percentage_24h
              ? `${coinDetails.market_data.price_change_percentage_24h}%`
              : 'N/A'}
          </p>
        </div>
      </div>

      <div className="coin-description">
        <h3>Description</h3>
        <ShowMoreText
          lines={3}
          more="Show More"
          less="Show Less"
          className="content-css"
          anchorClass="show-more-link"
          expanded={false}
          width={0}
        >
          {coinDetails.description?.en || 'No description available for this cryptocurrency.'}
        </ShowMoreText>
      </div>

      <div className="home-button-container">
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CoinDetailsPage;
