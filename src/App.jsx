import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Use Routes instead of Switch
import Navbar from './Components/Navbar/Navbar';
import Landing from './Components/Landing/Landing';
import List from './Components/List/CryptoList';
import CoinDetail from './Components/CoinDetail/CoinDetails';  // The new page for coin details



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<div><Landing/></div>} />
        <Route path="/list" element={<div><List/></div>} />
        <Route path="/coin/:coinId" element={<CoinDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
