import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export default function MyFavorites({ isLogin, loginHandler, logoutHandler }) {
  return (
    <div id="container">
      <div id="header">
        <Navigation isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
      </div>
      <div id="body">즐겨찾기당</div>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
