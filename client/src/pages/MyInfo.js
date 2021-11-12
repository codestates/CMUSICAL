import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

export default function MyInfo() {
  return (
    <div id="container">
      <div id="header">
        <Navigation />
      </div>
      <div id="body">내정보당</div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
