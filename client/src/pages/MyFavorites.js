import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Thumbnail from '../components/Thumbnail';
import getAuth from '../functions/getAuth';
import { Container } from '../components/styles/Container.styled';
import { Body } from '../components/styles/Body.styled';
import styled from 'styled-components';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

axios.defaults.withCredentials = true;

export const Title = styled.div`
  margin: 5rem 0 2rem 0;
  color: #1c1c1c;
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

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
      <Container>
        <Body>
          <Title>
            <h2>Favorites</h2>
          </Title>
          <List>
            {Array.isArray(list)
              ? list.map((el, idx) => {
                  return <Thumbnail isLogin={isLogin} key={idx} thumbnail={el.thumbnail} title={el.title} id={el.id} favorites={favorites} setFavorites={setFavorites} />;
                })
              : '로딩 이미지'}
          </List>
        </Body>
        <Footer />
      </Container>
    </>
  );
}
