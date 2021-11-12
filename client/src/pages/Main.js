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

export default function Main() {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios.get('https://localhost:4000/dummy/getitems').then((data) => {
      setList(...list, data.data.dbs.db);
    });
  }, []);
  // ? useEffect 두번째 인자로 준 [] 경고 이해하기!

  return (
    <div id="container">
      <div id="header">
        <Navigation />
      </div>
      <Body>
        <div className="title">
          <h2>Musical List</h2>
        </div>
        <div className="list">
          {list.map((el, idx) => {
            return <Thumbnail key={idx} poster={el.poster} title={el.prfnm} id={el.mt20id} />;
          })}
        </div>
      </Body>
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}
