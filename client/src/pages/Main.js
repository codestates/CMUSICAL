import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Thumbnail from '../components/Thumbnail';
import styled from 'styled-components';
import axios from 'axios';

axios.defaults.withCredentials = true;

export const Body = styled.div`
  width: auto;
  min-height: 500px;
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

export default function Main({ favoritesHandler }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get(`https://localhost:4000`).then((data) => {
      setList(data.data.items);
    });
  }, []);

  return (
    <div id="container">
      <Navigation />
      <Body>
        <div className="title">
          <h2>Musical List</h2>
        </div>
        <div className="list">
          {list.length > 0
            ? list.map((el, idx) => {
                return <Thumbnail key={idx} thumbnail={el.thumbnail} title={el.title} id={el.id} favoritesHandler={favoritesHandler} />;
              })
            : '로딩 이미지'}
        </div>
      </Body>
      <Footer />
    </div>
  );
}
