import React, { useEffect } from 'react';
import Navigation from '../components/Navigation';
import Thumbnail from '../components/Thumbnail';
import Footer from '../components/Footer';
import styled from 'styled-components';
import axios from 'axios';

export const Container = styled.div`
  width: auto;
  min-height: auto;
  border: 3px solid;

  > #body {
    border: 3px solid blue;
    padding: 50px;
  }
`;

export default function MyFavorites({ favoritesHandler, favoList }) {
  // ? App 컴포넌트에서 추가/삭제된 favoList를 내려받아서 favoList 조회만 하면 되는데
  // ? 굳이 GET 요청을 보내서 확인을 해야할까?
  // useEffect(() => {
  //   axios.get(' https://localhost:4000/favorites').then((data) => {});
  // }, [favoList]);

  return (
    <Container>
      <Navigation />
      <div id="body">
        {favoList.length > 0
          ? favoList.map((el) => {
              return <Thumbnail key={el.id} poster={el.thumbnail} title={el.title} id={el.id} favoritesHandler={favoritesHandler} />;
            })
          : '즐겨찾기를 추가해보세요!'}
      </div>
      <Footer />
    </Container>
  );
}
