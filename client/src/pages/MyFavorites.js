import React from 'react';
import Navigation from '../components/Navigation';
import Thumbnail from '../components/Thumbnail';
import Footer from '../components/Footer';
import styled from 'styled-components';

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
  return (
    <Container>
      <Navigation />
      <div id="body">
        {favoList.length > 0
          ? favoList.map((el) => {
              return <Thumbnail key={el.id} poster={el.thumbnail} title={el.title} id={el.id} favoritesHandler={favoritesHandler} />;
            })
          : '로딩 이미지'}
      </div>
      <Footer />
    </Container>
  );
}
