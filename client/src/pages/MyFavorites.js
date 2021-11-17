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

export const Container = styled.div`
  width: auto;
  min-height: auto;
  border: 3px solid;

  > #body {
    border: 3px solid blue;
    padding: 50px;
  }
`;

// export default function MyFavorites({ isLogin, loginHandler, logoutHandler }) {
export default function MyFavorites({ isLogin, loginHandler, logoutHandler }) {
  const [list, setList] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const handleFilter = async (text) => {
    let favoritesList;
    if (text) {
      favoritesList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/favorites?title=${text}`);
    } else {
      favoritesList = await axios.get(`${process.env.REACT_APP_SERVER_ADDR}/favorites`);
    }
    await getAuth(loginHandler, logoutHandler);
    setFavorites(favoritesList.data.items);
    setList(favoritesList.data.items);
  };

  useEffect(() => {
    handleFilter(window.sessionStorage.getItem('Keyword'));
  }, []);

  return (
    <>
      <Navigation handleFilter={handleFilter} isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
      <Body>
        <div className="title">
          <h2>Favorites</h2>
        </div>
        <div className="list">
          {Array.isArray(list)
            ? list.map((el, idx) => {
                return <Thumbnail isLogin={isLogin} key={idx} thumbnail={el.thumbnail} title={el.title} id={el.id} favorites={favorites} setFavorites={setFavorites} />;
              })
            : '로딩 이미지'}
        </div>
      </Body>
      <Footer />
    </>
  );
}
