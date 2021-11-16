import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Thumbnail from '../components/Thumbnail';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

export const Container = styled.div`
  width: auto;
  min-height: auto;
  border: 3px solid;

  > #body {
    border: 3px solid blue;
    padding: 50px;
  }
`;

export default function MyFavorites({ favoritesHandler, favoList, isLogin, loginHandler, logoutHandler }) {
  // TODO: useEffect() - GET 요청으로 즐겨찾기 목록 조회하기

  return (
    <Container>
      <Navigation isLogin={isLogin} loginHandler={loginHandler} logoutHandler={logoutHandler} />
      <div id="body">
        {favoList.length > 0
          ? favoList.map((el) => {
              return <Thumbnail key={el.id} poster={el.thumbnail} title={el.title} id={el.id} />;
            })
          : '즐겨찾기를 추가해보세요!'}
      </div>
      <Footer />
    </Container>
  );
}
