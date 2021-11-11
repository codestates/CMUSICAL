import React from 'react';
import { Navigation } from '../components/Navigation';

export default function MyInfo({ isLogin, logoutHandler }) {
  return (
    <div id="container">
      <div id="header">
        <Navigation isLogin={isLogin} logoutHandler={logoutHandler} />
      </div>
      <div id="body">내정보당</div>
      <div id="footer"></div>
    </div>
  );
}
