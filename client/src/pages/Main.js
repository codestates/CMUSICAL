import React from 'react';
import { Navigation } from '../components/Navigation';

export default function Main({ isLogin, loginHandler, logoutHandler }) {
  return (
    <div id="container">
      <div id="header">
        <Navigation isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
      </div>
      <div id="body">본문이당</div>
      <div id="footer"></div>
    </div>
  );
}
