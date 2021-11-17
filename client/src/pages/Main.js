import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Thumbnail from '../components/Thumbnail';
import getAuth from '../functions/getAuth';
import styled from 'styled-components';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.withCredentials = true;

export const Body = styled.div`
  width: auto;
  min-height: auto;
  border: 3px solid green;

  > .list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    border: 3px solid green;
    margin: 10px 50px;
    padding: 10px;
  }
`;

export default function Main({ isLogin, loginHandler, logoutHandler }) {
  const [list, setList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleFilter = async (text) => {
    let totalList, favoritesList;
    if (text) {
      totalList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}?title=${text}`);
    } else {
      totalList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}`);
    }
    if (isLogin) {
      favoritesList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/favorites`);
      setFavorites(favoritesList.data.items);
    }
    setList(totalList.data.items);
    // TODO 로그인 안하면 Favorites 쿼리 날리지 않도록 설정!
  };

  useEffect(() => {
    getAuth(loginHandler, logoutHandler);
    handleFilter(window.sessionStorage.getItem('Keyword'));
  }, []);

  return (
    <>
      <Navigation handleFilter={handleFilter} isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
      <Body>
        <div className="title">
          <h2>Musical List</h2>
        </div>
        <div className="list">
          {Array.isArray(list)
            ? list.map((el, idx) => {
                return <Thumbnail isLogin={isLogin} key={idx} thumbnail={el.thumbnail} title={el.title} id={el.id} favorites={favorites} />;
              })
            : '로딩 이미지'}
        </div>
      </Body>
      <Footer />
    </>
  );
}
