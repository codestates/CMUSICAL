import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function MyFavorites() {
  return (
    <div id="container">
      <div id="header">
        <Navigation />
      </div>
      <div id="body">즐겨찾기당</div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
