import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Thumbnail from '../components/Thumbnail';
import styled from 'styled-components';
import axios from 'axios';

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

export default function Main() {
  const [list, setList] = useState([]);

  const handleFilter = (text) => {
    if (text) {
      axios.get(`process.env.REACT_APP_SERVER_ADDR?title=${text}`).then((data) => {
        setList(data.data.items);
      });
    } else {
      axios.get(`process.env.REACT_APP_SERVER_ADDR`).then((data) => {
        setList(data.data.items);
      });
    }
  };

  useEffect(() => {
    handleFilter(window.sessionStorage.getItem('Keyword'));
  }, []);

  return (
    <>
      <Navigation handleFilter={handleFilter} />
      <Body>
        <div className="title">
          <h2>Musical List</h2>
        </div>
        <div className="list">
          {list
            ? list.map((el, idx) => {
                return <Thumbnail key={idx} thumbnail={el.thumbnail} title={el.title} id={el.id} />;
              })
            : '로딩 이미지'}
        </div>
      </Body>
      <Footer />
    </>
  );
}
